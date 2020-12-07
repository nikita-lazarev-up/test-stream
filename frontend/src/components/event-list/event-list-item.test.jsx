import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TEST_IDS } from "../../utils/tests";
import EventListItem from "./event-list-item";

test("should render EventListItem", () => {
  const event = {
    id: 1,
    type: "track",
    value: "example@example",
    timestamp: 1607337671703,
  };
  const { getByTestId } = render(<EventListItem event={event} />);
  expect(getByTestId(TEST_IDS.eventListItem)).toBeInTheDocument();
});
