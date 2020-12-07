import React from "react";
import { TEST_IDS } from "../../utils/tests";
import Styles from "./error-state.module.scss";

export default function ErrorState({ error }) {
  return (
    <div data-testid={TEST_IDS.errorState} className={Styles.error_state}>
      {error}
    </div>
  );
}
