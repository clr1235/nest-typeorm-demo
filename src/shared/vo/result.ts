export class Result<T> {
  code: number;
  message: string;
  data?: T;
  constructor(data?: T) {
    this.code = 200;
    this.message = 'success';
    this.data = data;
  }
}
