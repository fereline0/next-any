import IBaseEntity from "./baseEntity.interface";
import IBook from "./bookDTO.interface";

export default interface IAuthor extends IBaseEntity {
  name: string;
  description?: string;
  image?: string;
  books: IBook[];
}
