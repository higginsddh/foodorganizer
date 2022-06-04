import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import RecipeForm from "~/components/recipeForm";
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
    <RecipeForm formId="recipeForm" defaultValues={actionData?.fields ?? {}}>
      {actionData?.fieldErrors?.content ? (
        <p className="form-validation-error" role="alert" id="content-error">
          {actionData?.fieldErrors?.content}
        </p>
      ) : null}
    </RecipeForm>
  );
}
