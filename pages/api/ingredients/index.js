import dbConnect from "@/db/connect";
import Ingredient from "@/db/models/Ingredient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token?.sub;
  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const ingredients = await Ingredient.find({ owner: userId });
      return response.status(200).json(ingredients);
    } else {
      const ingredients = await Ingredient.find({ owner: "default" });
      return response.status(200).json(ingredients);
    }
  }

  if (request.method === "POST") {
    try {
      if (!session) {
        return response.status(401).json({ status: "Not authorized" });
      }
      const ingredientData = request.body;
      await Ingredient.create({
        ...ingredientData,
        owner: userId,
      });

      response.status(201).json({ status: "ingredient added" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
