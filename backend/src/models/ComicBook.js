import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const comicBookSchema = new Schema(
  {
    bookName: {
      type: String,
      trim: true,
      required: [true, "Please enter the book name"],
      minLength: [3, "Book name can not be less than 3 characters"],
      maxLength: [100, "Book name can not exceed 100 characters"],
    },
    authorName: {
      type: String,
      trim: true,
      required: [true, "Please enter the author name"],
      minLength: [3, "Author name can not be less than 3 characters"],
      maxLength: [100, "Author name can not exceed 100 characters"],
    },
    yearOfPublication: {
      type: Number,
      required: [true, "Please enter the year of publication"],
      min: [1900, "Year of publication can not be earlier than 1900"],
      max: [
        new Date().getFullYear(),
        `Year of publication can not exceed ${new Date().getFullYear()}`,
      ],
    },
    price: {
      type: Number,
      required: [true, "Please enter the price"],
      min: [0, "Price can not be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount can not be negative"],
      max: [100, "Discount can not exceed 100%"],
    },
    numberOfPages: {
      type: Number,
      required: [true, "Please enter the number of pages"],
      min: [1, "Number of pages can not be less than 1"],
    },
    condition: {
      type: String,
      required: [true, "Please enter the condition"],
      enum: {
        values: ["new", "used"],
        message: "Condition must be either 'new' or 'used'",
      },
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description can not exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

comicBookSchema.plugin(mongoosePaginate); // The paginate plugin to the schema

const ComicBook = model("ComicBook", comicBookSchema);

export default ComicBook;
