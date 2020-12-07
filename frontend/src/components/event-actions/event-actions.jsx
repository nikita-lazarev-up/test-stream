import React from "react";
import { TEST_IDS } from "../../utils/tests";
import Styles from "./event-actions.module.scss";

export default function EventActions({ state, onChange = () => {} }) {
  return (
    <form data-testid={TEST_IDS.eventActions} className={Styles.event_actions}>
      <label className={Styles.event_actions__label}>
        <input
          type="radio"
          name="state"
          value="live"
          onChange={(e) => onChange(true)}
          checked={state}
        />
        <span className={Styles.event_actions__btn}>Live</span>
      </label>
      <label className={Styles.event_actions__label}>
        <input
          type="radio"
          name="state"
          value="pause"
          onChange={(e) => onChange(false)}
          checked={!state}
        />
        <span className={Styles.event_actions__btn}>Pause</span>
      </label>
    </form>
  );
}
