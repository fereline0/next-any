import IBaseEntity from "./baseEntity.interface";
import IBook from "./book.interface";

export default interface IAuthor extends IBaseEntity {
  name: string;
  description?: string;
  image?: string;
  books: IBook[];
}
