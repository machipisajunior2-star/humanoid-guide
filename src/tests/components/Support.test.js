import { render, screen } from "@testing-library/react";
import Support from "../../pages/Support";

test("renders an h1", () => {
  render(<Support />);
  const h1 = screen.getByText(/Support/);
  expect(h1).toHaveTextContent("Support");
});
