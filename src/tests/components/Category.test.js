import { render, screen } from "@testing-library/react";
import Category from "../../pages/Category";

test("renders an h1", () => {
  render(<Category />);
  const h1 = screen.getByText(/Category/);
  expect(h1).toHaveTextContent("Category");
});