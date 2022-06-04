import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { db } from "~/utils/db.server";
import type { Recipe } from "@prisma/client";

type LoaderData = { recipes: Array<Recipe> };

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
      <div className="d-flex justify-content-end mb-3">
        <Link to="/recipes/new">
          <Button type="button">Add Recipe</Button>
        </Link>
      </div>
      {data.recipes.map((r) => (
        <Card key={r.id} className="mb-3">
          <CardBody>
            <CardTitle tag="h5">
              <div className="d-flex justify-content-between">
                <div>{r.title}</div>
                <div>
                  <Link to={`/recipes/edit/${r.id}`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      id={`${r.id}_Edit`}
                      title="Edit"
                      titleId={`${r.id}_Edit_Title`}
                    />
                  </Link>

                  <Link to={`/recipes/delete/${r.id}`}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="ms-3"
                      id={`${r.id}_Delete`}
                      title="Delete"
                      titleId={`${r.id}_Delete_Title`}
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
