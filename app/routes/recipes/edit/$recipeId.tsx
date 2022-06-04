import type { Recipe } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import RecipeForm from "~/components/recipeForm";
import { db } from "~/utils/db.server";

type LoaderData = { recipe: Recipe };

export const loader: LoaderFunction = async ({ params }) => {
  const recipe = await db.recipe.findFirst({
    where: {
      id: params.recipeId,
    },
  });

  if (!recipe) {
    return {
      id: "",
      title: "",
      notes: "",
    };
  }

  const data: LoaderData = { recipe };

  return json(data);
};

export const action: ActionFunction = async ({ params, request }) => {
  let { title, notes } = Object.fromEntries(await request.formData());
  if (typeof title !== "string" || typeof notes !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  await db.recipe.update({
    where: {
      id: params.recipeId,
    },
    data: {
      title,
      notes,
    },
  });

  return redirect(`/recipes`);
};

export default function RecipeEdit() {
  const data = useLoaderData<LoaderData>();

  return <RecipeForm formId="receiptEdit" defaultValues={data.recipe} />;
}
