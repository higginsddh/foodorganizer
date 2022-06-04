import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const action: ActionFunction = async ({ params, request }) => {
  console.log(params.recipeId);
  // const content = form.get("content");
  // if (typeof name !== "string" || typeof content !== "string") {
  //   return badRequest({
  //     formError: `Form not submitted correctly.`,
  //   });
  // }

  // const fieldErrors = {
  //   name: validateJokeName(name),
  //   content: validateJokeContent(content),
  // };
  // const fields = { name, content };
  // if (Object.values(fieldErrors).some(Boolean)) {
  //   return badRequest({ fieldErrors, fields });
  // }

  // const joke = await db.joke.create({ data: fields });
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
