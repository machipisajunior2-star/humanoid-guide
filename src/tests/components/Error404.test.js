import { render, screen } from "@testing-library/react";
import Error404 from "../../pages/Error404";

test("renders an h1", () => {
  render(<Error404 />);
  const h1 = screen.getByText(/Page not found/);
  expect(h1).toHaveTextContent("Page not found");
});