import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  recipe: { type: String, required: true },
});

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
