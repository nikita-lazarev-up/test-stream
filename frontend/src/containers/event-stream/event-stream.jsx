import React from "react";
import openSocketClient from "socket.io-client";
import { TEST_IDS } from "../../utils/tests";
import { SOCKET_ENDPOINT } from "../../utils/config";
import { normalizeEventFromSocket } from "../../utils/events";
import EventList from "../../components/event-list/event-list";
import EventActions from "../../components/event-actions/event-actions";
import SearchEvents from "../../components/search-events/search-events";
import ErrorState from "../../components/error-state/error-state";
import Styles from "./event-stream.module.scss";

const MAX_DISPLAYED_EVENTS = 100;

export default function EventStream() {
  const socketInstance = React.useRef();
  const [events, setEvents] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [error, setError] = React.useState("");
  const [isStreaming, setIsStreaming] = React.useState(false);
  const filteredEvents = React.useMemo(() => {
    const filtered = events.filter((event) => {
      const searchParam = `${event.type}${event.value}`.toLowerCase();
      return searchParam.includes(searchValue);
    });
    return [...filtered].splice(0, MAX_DISPLAYED_EVENTS);
  }, [events, searchValue]);

  const openSocket = React.useCallback(() => {
    socketInstance.current = openSocketClient(SOCKET_ENDPOINT);
    setIsStreaming(true);

    socketInstance.current.on("events", (receivedEvents) => {
      setEvents((prevEvents) => {
        const normalizedEvents = receivedEvents.map((receivedEvent) =>
          normalizeEventFromSocket(receivedEvent)
        );
        return [...normalizedEvents, ...prevEvents];
      });
    });

    socketInstance.current.on("connect_error", () => {
      setIsStreaming(false);
      setError("Connection error...");
    });

    socketInstance.current.on("error", () => {
      setIsStreaming(false);
      setError("Server error...");
    });
  }, []);

  const closeSocket = React.useCallback(() => {
    socketInstance.current.close();
    socketInstance.current = null;
    setIsStreaming(false);
  }, []);

  const handleStreamChange = React.useCallback(
    (state) => {
      return state ? openSocket() : closeSocket();
    },
    [openSocket, closeSocket]
  );

  const handleEventsSearch = React.useCallback((searchString) => {
    const value = searchString.toLowerCase().trim();
    setSearchValue(value);
  }, []);

  React.useEffect(() => {
    openSocket();

    return () => {
      closeSocket();
    };
  }, [openSocket, closeSocket]);

  return (
    <div data-testid={TEST_IDS.eventStream} className={Styles.event_stream}>
      <div className={Styles.event_stream__header}>
        <div className={Styles.event_stream__actions}>
          <EventActions state={isStreaming} onChange={handleStreamChange} />
        </div>
        <div className={Styles.event_stream__search}>
          <SearchEvents value={searchValue} onChange={handleEventsSearch} />
        </div>
      </div>
      {error ? (
        <ErrorState error={error} />
      ) : (
        <div className={Styles.event_stream__content}>
          <EventList events={filteredEvents} />
        </div>
      )}
    </div>
  );
}
