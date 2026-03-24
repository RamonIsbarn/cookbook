import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    try {
      const recipeData = request.body;
      const recipeToUpdate = await Recipe.findByIdAndUpdate(id, recipeData, {
        new: true,
      });
      if (!recipeToUpdate) {
        response.status(404).json({ status: "Recipe not found" });
        return;
      }
      response.status(200).json(recipeToUpdate);
      return;
    } catch (error) {
      response.status(500).json({ status: "error updating Recipe" });
      return;
    }
  }
  if (request.method === "DELETE") {
    await Recipe.findByIdAndDelete(id);
    response.status(200).json({ status: `Recipe ${id} successfully deleted.` });
    return;
  }
  response.setHeader("Allow", ["PUT", "DELETE"]);
  response.status(405).end(`Method ${request.method} not allowed`);
  return;
}
