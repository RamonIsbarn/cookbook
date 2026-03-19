import dbConnect from "@/db/connect";
import Ingredient from "@/db/models/Ingredient";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    try {
      const ingredientData = request.body;
      const ingredientToUpdate = await Ingredient.findByIdAndUpdate(
        id,
        ingredientData,
        { new: true }
      );
      if (!ingredientToUpdate) {
        response.status(404).json({ status: "Ingredient not found" });
        return;
      }
      response.status(200).json(ingredientToUpdate);
      return;
    } catch (error) {
      response.status(500).json({ status: "error updating ingredient" });
      return;
    }
  }
  if (request.method === "DELETE") {
    await Ingredient.findByIdAndDelete(id);
    response
      .status(200)
      .json({ status: `Ingredient ${id} successfully deleted.` });
  }
  response.setHeader("Allow", ["PUT", "DELETE"]);
  response.status(405).end(`Method ${request.method} not allowed`);
}
