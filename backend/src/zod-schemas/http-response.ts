import z from "zod";

export const httpResponses = {
  204: z.null().describe("No Content"),
  404: z
    .object({
      statusCode: z.number(),
      error: z.string(),
      message: z.string(),
    })
    .describe("Not Found"),
  500: z
    .object({
      statusCode: z.number(),
      error: z.string(),
      message: z.string(),
    })
    .describe("Internal Server Error"),
};
