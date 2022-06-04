import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { SavedRecipe } from "~/models/receipe";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { db } from "~/utils/db.server";

type LoaderData = { recipes: Array<SavedRecipe> };

export const loader: LoaderFunction = async () => {
  const recipes = await db.recipe.findMany({
    orderBy: [
      {
        title: "asc",
      },
    ],
  });
  const data: LoaderData = { recipes };
  return json(data);
};

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      {data.recipes.map((r) => (
        <Card key={r.id} className="mb-3">
          <CardBody>
            <CardTitle tag="h5">
              <div className="d-flex justify-content-between">
                <div>{r.title}</div>
                <div>
                  <FontAwesomeIcon icon={faEdit} title="Edit Receipt" />
                  <Link to={`/recipes/delete/${r.id}`}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      title="Delete Receipt"
                      className="ms-3"
                    />
                  </Link>
                </div>
              </div>
            </CardTitle>
            <CardText>{r.notes}</CardText>
          </CardBody>
        </Card>
      ))}
      <Outlet />
    </>
  );
}
