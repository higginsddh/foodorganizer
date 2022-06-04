import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet, Scripts } from "@remix-run/react";

import globalStylesUrl from "bootstrap/dist/css/bootstrap.min.css";

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
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
