import { z } from "zod";

export const validateComicBook = (comicBook) => {
  const schema = z.object({
    bookName: z.string().nonempty("Book name is required").optional(),
    authorName: z.string().nonempty("Author name is required").optional(),
    yearOfPublication: z
      .number()
      .int()
      .min(1800, "Year of publication cannot be earlier than 1800")
      .max(
        new Date().getFullYear(),
        `Year of publication cannot exceed ${new Date().getFullYear()}`
      )
      .optional(),
    price: z
      .number()
      .min(0, "Price must be greater than or equal to 0")
      .optional(),
    discount: z
      .number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100")
      .default(0)
      .optional(),
    numberOfPages: z
      .number()
      .int()
      .min(1, "Number of pages must be at least 1")
      .optional(),
    condition: z
      .enum(["new", "used"], {
        required_error: "Condition is required",
      })
      .optional(),
    description: z.string().nullable().optional(),
  });

  return schema.safeParse(comicBook);
};
