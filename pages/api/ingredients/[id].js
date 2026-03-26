import dbConnect from "@/db/connect";
import Ingredient from "@/db/models/Ingredient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    try {
      if (!session) {
        return response.status(401).json({ status: "Not authorized" });
      }
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
    if (!session) {
      return response.status(401).json({ status: "Not authorized" });
    }
    await Ingredient.findByIdAndDelete(id);
    response
      .status(200)
      .json({ status: `Ingredient ${id} successfully deleted.` });
    return;
  }
  response.setHeader("Allow", ["PUT", "DELETE"]);
  response.status(405).end(`Method ${request.method} not allowed`);
  return;
}
