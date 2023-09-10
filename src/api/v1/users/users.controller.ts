import { registerService } from "@/api/v1/users/users.service";
import { RequestHandler } from "express";

export const registerController: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;
    // TODO Add data validation middleware
    const result = await registerService(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
