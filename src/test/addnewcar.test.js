import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Addnewcar from "../pages/add-new-car"

test("Render Add New Car Page", () => {
  render(
    <BrowserRouter>
      <Addnewcar/>
    </BrowserRouter>
  );
  expect(screen.getByText("Nama/Tipe Mobil")).toBeInTheDocument();
});