import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TEST_IDS } from "../../utils/tests";
import ErrorState from "./error-state";

test("should render ErrorState", () => {
  const { getByTestId } = render(<ErrorState />);
  expect(getByTestId(TEST_IDS.errorState)).toBeInTheDocument();
});
