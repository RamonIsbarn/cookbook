import dbConnect from "@/db/connect";
import Ingredient from "@/db/models/Ingredient";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const ingredients = await Ingredient.find();
    return response.status(200).json(ingredients);
  }

  if (request.method === "POST") {
    try {
      const ingredientData = request.body;
      await Ingredient.create(ingredientData);

      response.status(201).json({ status: "ingredient added" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
