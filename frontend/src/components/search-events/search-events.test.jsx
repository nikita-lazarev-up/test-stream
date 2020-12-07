import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TEST_IDS } from "../../utils/tests";
import SearchEvents from "./search-events";

test("should render SearchEvents", () => {
  const { getByTestId } = render(<SearchEvents />);
  expect(getByTestId(TEST_IDS.searchEvents)).toBeInTheDocument();
});
