import React from "react";
import { TEST_IDS } from "../../utils/tests";
import EventListItem from "./event-list-item";
import Styles from "./event-list.module.scss";

export default function EventList({ events = [] }) {
  return (
    <div data-testid={TEST_IDS.eventList} className={Styles.event_list}>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
}
