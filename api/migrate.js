//require("dotenv").config();
//const { connection } = require("./db");

/*
connection.sync({alter: true}).then(() => {
  console.log("Database synchronized");
  connection.close();
});
*/


require('dotenv').config();
const { Recepy, Ingredient, connection } = require('./db');

(async () => {
  try {
    await connection.sync({ alter: true });

    const data = require('./recette.json');

    for (const recipeData of data.recettes) {
      const recipe = await Recepy.create({
        nom: recipeData.nom,
        description: recipeData.description,
        instructions: JSON.stringify(recipeData.instructions),
        saison: recipeData.saison,
      });

      for (const ingredientName of recipeData.ingredients) {
        const [ingredient, created] = await Ingredient.findOrCreate({
          where: { nom: ingredientName },
        });
        // Associate ingredient with the recipe
        await ingredient.setRecepy(recipe);
      }
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await connection.close();
  }
})();
