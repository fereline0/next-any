export default interface IService<T> {
  data: T | null;
  error: string | null;
}
