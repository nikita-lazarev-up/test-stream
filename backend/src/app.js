import socketIO from "socket.io";
import express from "express";
import http from "http";
import winston from "winston";
import _ from "lodash";

/**
 * Socket server
 */
class App {
  configure(redis, throttle) {
    this.activeSockets = [];
    this.pendingEvents = [];
    this.redis = redis;
    this.throttleWait = throttle;
    this.expressApp = express();
    this.httpServer = http.Server(this.expressApp);
    this.socketIO = socketIO(this.httpServer);

    // init
    this.createLogger();
    this.handleSockets();
    this.subscribeToEvents();
    this.createThrottler();
    this.handleMessages();
    this.handleError();
  }

  // Winston logger
  createLogger() {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          timestamp: () => new Date().toString(),
          colorize: true,
        }),
      ],
    });
  }

  // subscribe
  handleSockets() {
    this.socketIO.on("connection", (socket) => {
      this.activeSockets.push(socket);
      this.logger.info(
        "Socket connected. Active sockets:",
        this.activeSockets.length
      );

      socket.on("disconnect", () => {
        this.activeSockets.splice(this.activeSockets.indexOf(socket), 1);
        this.logger.info(
          "Socket disconnected. Active sockets:",
          this.activeSockets.length
        );
      });
    });
  }

  // subscribe to events
  subscribeToEvents() {
    this.redis.subscribe("events", (err, count) => {
      if (err) {
        this.logger.error("Failed subscribing to events stream", err);
        return;
      }
      if (count !== 1) {
        this.logger.warn("Unexpected number of subscribed channels", count);
      }
    });
  }

  // throttler for events
  createThrottler() {
    this.emitPendingEvents = _.throttle(() => {
      if (this.pendingEvents.length === 0) {
        return;
      }

      this.logger.info(
        "Emitting %d events to %d sockets",
        this.pendingEvents.length,
        this.activeSockets.length
      );

      this.activeSockets.forEach((socket) => {
        socket.emit("events", this.pendingEvents);
      });

      this.pendingEvents.splice(0, this.pendingEvents.length);
    }, this.throttleWait);
  }

  // Send messages to clients
  handleMessages() {
    this.redis.on("message", (channel, message) => {
      if (channel !== "events") {
        this.logger.warn("Unexpected message to channel", channel, message);
        return;
      }
      this.emitPendingEvents();
      this.pendingEvents.unshift(JSON.parse(message));
    });
  }

  // Send errors to clients
  handleError() {
    this.redis.on("error", (error) => {
      this.logger.error("Redis", error);

      this.activeSockets.forEach((socket) => {
        socket.emit("error", error);
      });
    });
  }

  // Run the server at the specified port
  run(port) {
    this.httpServer.listen(port);
    this.logger.info("Server initialized on port", port);
  }
}

export default App;
