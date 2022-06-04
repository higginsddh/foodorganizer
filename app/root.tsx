import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet, Scripts } from "@remix-run/react";

import globalStylesUrl from "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavbarBrand } from "reactstrap";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Food Organization</title>
        <Links />
      </head>
      <body>
        <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">Recipes</NavbarBrand>
        </Navbar>
        <div className="container mt-5">
          <Outlet />
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
