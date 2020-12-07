import React from "react";
import format from "date-fns/format";
import { TEST_IDS } from "../../utils/tests";
import Styles from "./event-list.module.scss";
import { CircleIcon } from "../../icons";

export default function EventListItem({ event }) {
  if (!event) {
    return null;
  }

  return (
    <div
      data-testid={TEST_IDS.eventListItem}
      className={Styles.event_list_item}
    >
      <div className={Styles.event_list_item__icon}>
        <CircleIcon />
      </div>
      <div className={Styles.event_list_item__type}>{event.type}</div>
      <div className={Styles.event_list_item__value}>{event.value}</div>
      <div className={Styles.event_list_item__time}>
        {format(new Date(event.timestamp), "yyyy/MM/dd HH:mm:ss")}
      </div>
    </div>
  );
}
