import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import type { SavedRecipe } from "~/models/receipe";
import IconButton from "./iconButton";

export default function ReceipeList({
  recipes,
}: {
  recipes: Array<SavedRecipe>;
}) {
  return (
    <>
      {(recipes ?? []).map((r) => (
        <Card key={r.id} className="mb-3">
          <CardBody>
            <CardTitle tag="h5">
              <div className="d-flex justify-content-between">
                <div>{r.title}</div>
                <div>
                  <IconButton>
                    <FontAwesomeIcon icon={faEdit} title="Edit Receipt" />
                  </IconButton>
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
    </>
  );
}
