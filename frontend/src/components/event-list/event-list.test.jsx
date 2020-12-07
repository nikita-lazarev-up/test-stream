import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TEST_IDS } from "../../utils/tests";
import EventList from "./event-list";

test("should render EventList", () => {
  const { getByTestId } = render(<EventList />);
  expect(getByTestId(TEST_IDS.eventList)).toBeInTheDocument();
});
