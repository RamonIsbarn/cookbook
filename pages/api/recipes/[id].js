import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    if (session) {
      return response.status(401).json({ status: "Not authorized" });
    }
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
    if (!session) {
      return response.status(401).json({ status: "Not authorized" });
    }
    await Recipe.findByIdAndDelete(id);
    response.status(200).json({ status: `Recipe ${id} successfully deleted.` });
    return;
  }
  response.setHeader("Allow", ["PUT", "DELETE"]);
  response.status(405).end(`Method ${request.method} not allowed`);
  return;
}
