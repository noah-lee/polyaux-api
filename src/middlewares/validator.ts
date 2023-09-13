import { Request, Response, NextFunction } from "express";
import z, { AnyZodObject } from "zod";

type Schemas = {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
};

const validator =
  (schemas: Schemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      body = z.strictObject({}),
      query = z.strictObject({}),
      params = z.strictObject({}),
    } = schemas;

    const combinedSchema = z.object({
      body,
      query,
      params,
    });

    try {
      await combinedSchema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };

export default validator;
