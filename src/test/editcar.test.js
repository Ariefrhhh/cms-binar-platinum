import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Editcar from "../pages/edit-car";

test("Render Add New Car Page", () => {
  render(
    <BrowserRouter>
      <Editcar/>
    </BrowserRouter>
  );
  expect(screen.getByText("Nama/Tipe Mobil")).toBeInTheDocument();
});