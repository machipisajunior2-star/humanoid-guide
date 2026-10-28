import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";

test("renders an h1", () => {
  render(<Home />);
  const h1 = screen.getByText(/Home/);
  expect(h1).toHaveTextContent("Home");
});
