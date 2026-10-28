import { render, screen } from "@testing-library/react";
import Humanoids from "../../pages/Humanoids";

test("renders an h1", () => {
  render(<Humanoids />);
  const h1 = screen.getByText(/Humanoids/);
  expect(h1).toHaveTextContent("Humanoids");
});
