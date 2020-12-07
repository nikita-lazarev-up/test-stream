import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TEST_IDS } from "../../utils/tests";
import EventActions from "./event-actions";

test("should render EventActions", () => {
  const { getByTestId } = render(<EventActions />);
  expect(getByTestId(TEST_IDS.eventActions)).toBeInTheDocument();
});
