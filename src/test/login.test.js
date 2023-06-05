import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";w
import Login from "../pages/login";

test("Render Add New Car Page", () => {
  render(
    <BrowserRouter>
      <Login/>
    </BrowserRouter>
  );
  expect(screen.getByText("Nama/Tipe Mobil")).toBeInTheDocument();
});