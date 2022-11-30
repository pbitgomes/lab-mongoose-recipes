import express from "express";
import Recipe from "../models/Recipe.model.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const recipes = await Recipe.find();
    return response.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Ops... Algo deu errado..." });
  }
});

//GET BY ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return response.status(404).json("Receita não encontrada.");
    }

    return response.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Ops... Algo deu errado..." });
  }
});

// MÉTODO POST
router.post("/create-recipe", async (request, response) => {
  try {
    const newRecipe = await Recipe.create(request.body);

    return response.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Ops... Algo deu errado..." });
  }
});

// MÉTODO PUT
router.put("/edit-recipe/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const update = await Recipe.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true, runValidators: true }
    );

    return response.status(200).json(update);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Ops... Algo deu errado..." });
  }
});

// MÉTODO DELETE
router.delete("/delete-recipe/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteRecipe = await Recipe.findByIdAndDelete(id);
    return response.status(200).json(deleteRecipe);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Ops... Algo deu errado..." });
  }
});

export default router;
