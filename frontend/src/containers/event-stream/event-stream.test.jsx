import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TEST_IDS } from "../../utils/tests";
import EventStream from "./event-stream";

test("should render EventStream", () => {
  const { getByTestId } = render(<EventStream />);
  expect(getByTestId(TEST_IDS.eventStream)).toBeInTheDocument();
});
