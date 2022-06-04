import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ params }) => {
  await db.recipe.delete({
    where: {
      id: params.recipeId,
    },
  });

  return redirect(`/recipes`);
};

export default function RecipeDelete() {
  return (
    <Modal isOpen={true}>
      <ModalBody>Are you sure you want to delete this recipe?</ModalBody>
      <ModalFooter>
        <form method="post">
          <Button type="submit" color="danger">
            Yes
          </Button>
        </form>
        <Link to="/recipes">
          <Button type="button" color="secondary">
            No
          </Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
}
