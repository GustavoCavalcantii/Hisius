export class TooManyRequest extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "TooManyRequest";
    this.statusCode = 429;
  }
}
