import Redis from "ioredis";
import Application from "./app";
import { THROTTLE, SERVER_PORT } from "./config";

const app = new Application();
app.configure(new Redis(), THROTTLE);
app.run(SERVER_PORT);
