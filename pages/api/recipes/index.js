import dbConnect from "@/db/connect";
import Recipe from "@/db/models/Recipe";
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
      const recipes = await Recipe.find({ owner: userId });
      return response.status(200).json(recipes);
    } else {
      const recipes = await Recipe.find({ owner: "default" });
      return response.status(200).json(recipes);
    }
  }

  if (request.method === "POST") {
    if (!session) {
      return response.status(401).json({ status: "Not authorized" });
    }
    try {
      const recipeData = request.body;
      await Recipe.create({ ...recipeData, owner: userId });

      response.status(201).json({ status: "recipe added" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
