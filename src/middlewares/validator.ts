import { Request, Response, NextFunction } from "express";
import z, { AnyZodObject, ZodEffects } from "zod";

type Schemas = {
  body?: AnyZodObject | ZodEffects<AnyZodObject>;
  query?: AnyZodObject | ZodEffects<AnyZodObject>;
};

const validator =
  ({ body = z.strictObject({}), query = z.strictObject({}) }: Schemas) =>
  async (
    req: Request<any, any, z.infer<typeof body>, z.infer<typeof query>>,
    res: Response,
    next: NextFunction
  ) => {
    const combinedSchema = z.object({
      body,
      query,
    });

    try {
      const parsed = await combinedSchema.parseAsync({
        body: req.body,
        query: req.query,
      });

      req.body = parsed.body;
      req.query = parsed.query;

      return next();
    } catch (error) {
      next(error);
    }
  };

export default validator;
