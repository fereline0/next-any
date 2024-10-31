import IBaseEntity from "./baseEntity.interface";
import ICategory from "./category.interface";

export default interface IBook extends IBaseEntity {
  title: string;
  description: string;
  price: number;
  image?: string;
  authorId: number;
  publishingId: number;
  categories: ICategory[];
}
