import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";w
import Dashboard from "../pages/dashboard";

test("Render Add New Car Page", () => {
  render(
    <BrowserRouter>
      <Dashboard/>
    </BrowserRouter>
  );
  expect(screen.getByText("Nama/Tipe Mobil")).toBeInTheDocument();
});