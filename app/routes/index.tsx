import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/recipes");
};

export default function Index() {}
