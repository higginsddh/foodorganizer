import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import type { SavedRecipe } from "~/models/receipe";
import IconButton from "./IconButton";

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
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faTrash}
                      title="Delete Receipt"
                      className="ms-3"
                      // onClick={() => mutation.mutate(r.id)}
                    />
                  </IconButton>
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
