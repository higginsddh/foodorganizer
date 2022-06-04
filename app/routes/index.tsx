import { Outlet } from "@remix-run/react";
import { Navbar, NavbarBrand } from "reactstrap";
// import AddReceipeButton from "~/components/AddReceipeButton";
// import ReceipeList from "~/components/RecipeList";

export default function IndexRoute() {
  return (
    <>
      <Navbar color="light" expand="md" light>
        <NavbarBrand href="/">Recipes</NavbarBrand>
      </Navbar>
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  );
}
