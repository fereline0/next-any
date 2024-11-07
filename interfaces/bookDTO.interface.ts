import IBaseEntity from "./baseEntity.interface";

export default interface IBookDTO extends IBaseEntity {
  title: string;
  description: string;
  price: number;
  image?: string;
  authorId: number;
  categoryIds: number[];
}
