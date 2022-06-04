import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Navbar, NavbarBrand } from "reactstrap";
import ReceipeList from "~/components/recipeList";
import type { SavedRecipe } from "~/models/receipe";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

// import AddReceipeButton from "~/components/AddReceipeButton";
// import ReceipeList from "~/components/RecipeList";

type LoaderData = { recipes: Array<SavedRecipe> };

export const loader: LoaderFunction = async () => {
  // const count = await db.joke.count();
  // const randomRowNumber = Math.floor(Math.random() * count);
  // const [randomJoke] = await db.joke.findMany({
  //   take: 1,
  //   skip: randomRowNumber,
  // });
  const data: LoaderData = {
    recipes: [
      {
        id: "i-1",
        title: "Asian Noodles",
        notes: "Test note",
      },
    ],
  };
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
