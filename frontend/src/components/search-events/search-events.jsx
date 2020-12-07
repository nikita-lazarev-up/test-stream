import React from "react";
import { TEST_IDS } from "../../utils/tests";
import Styles from "./search-events.module.scss";
import { SearchIcon } from "../../icons";

export default function SearchEvents({ value, onChange = () => {} }) {
  return (
    <div data-testid={TEST_IDS.searchEvents} className={Styles.search_events}>
      <span className={Styles.search_events__icon}>
        <SearchIcon />
      </span>
      <input
        className={Styles.search_events__input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to search..."
      />
    </div>
  );
}
