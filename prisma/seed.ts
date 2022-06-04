import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getRecipes().map((recipes) => {
      return db.recipe.create({ data: recipes });
    })
  );
}

seed();

function getRecipes() {
  return [
    {
      title: "Asian Noodles",
      notes: `Vegetarian`,
    },
    {
      title: "Jerk Chicken",
      notes: ``,
    },
  ];
}
