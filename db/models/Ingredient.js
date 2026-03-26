import mongoose from "mongoose";

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  type: { type: String, required: true },
  owner: { type: String, required: true },
});

const Ingredient =
  mongoose.models.Ingredient || mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;
