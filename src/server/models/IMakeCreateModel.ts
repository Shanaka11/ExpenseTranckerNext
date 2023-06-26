export interface IMakeCreateModel<T> {
  validateModel: (data: T) => void;
  generateId: () => string;
}
