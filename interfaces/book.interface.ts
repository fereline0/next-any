import IBaseEntity from "./baseEntity.interface";

export default interface IBook extends IBaseEntity {
  title: string;
  description: string;
  price: number;
  images?: string[];
  authorId: number;
  publishingId: number;
  categoryId: number;
}
