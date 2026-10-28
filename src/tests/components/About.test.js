import { render, screen } from "@testing-library/react";
import About from "../../pages/About";

test("renders an h1", () => {
  render(<About />);
  const h1 = screen.getByText(/About/);
  expect(h1).toHaveTextContent("About");
});
