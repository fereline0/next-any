export default interface IPagedResult<T> {
  total: number;
  items: T;
}
