import IBaseEntity from "./baseEntity.interface";
import IBook from "./bookDTO.interface";

export default interface ICategory extends IBaseEntity {
  name: string;
  books: IBook[];
}
