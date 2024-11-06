import IBaseEntity from "./baseEntity.interface";

export default interface ICart extends IBaseEntity {
  userId: number;
  bookId: number;
}
