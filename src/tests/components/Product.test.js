import { render, screen } from "@testing-library/react";
import Product from "../../pages/Product";

test("renders an h1", () => {
  render(<Product />);
  const h1 = screen.getByText(/Product/);
  expect(h1).toHaveTextContent("Product");
});
