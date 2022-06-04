import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { db } from "~/utils/db.server";

type ActionData = {
  formError?: string;
  fieldErrors?: { name: string | undefined; content: string | undefined };
  fields?: {
    title: string;
    notes: string;
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  let { title, notes } = Object.fromEntries(await request.formData());
  if (typeof title !== "string" || typeof notes !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  // if (typeof name !== "string" || typeof content !== "string") {
  //   return badRequest({
  //     formError: `Form not submitted correctly.`,
  //   });
  // }

  // const fieldErrors = {
  //   name: validateJokeName(name),
  //   content: validateJokeContent(content),
  // };

  // if (Object.values(fieldErrors).some(Boolean)) {
  //   return badRequest({ fieldErrors, fields });
  // }

  await db.recipe.create({ data: { title, notes } });
  return redirect(`/recipes`);
};

export default function RecipeCreate() {
  let actionData = useActionData<ActionData | undefined>();

  return (
    <Modal isOpen={true}>
      <ModalHeader>Recipe</ModalHeader>
      <ModalBody>
        <Form method="post" id="recipeForm">
          <FormGroup>
            <Label for="title" className="required">
              Title
            </Label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              required
              defaultValue={actionData?.fields?.title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="notes">Notes</Label>
            <input
              id="notes"
              name="notes"
              type="textarea"
              className="form-control"
              defaultValue={actionData?.fields?.notes}
            />
          </FormGroup>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData?.fieldErrors?.content}
            </p>
          ) : null}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary" form="recipeForm">
          Save
        </Button>
        <Link to="/recipes">
          <Button type="button" color="secondary">
            Cancel
          </Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
}
