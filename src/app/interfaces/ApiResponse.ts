export default interface ApiResponse<T> {
  result: T;
  message: string;
  statusCode: number;
  success: boolean;
  errors: any;
}