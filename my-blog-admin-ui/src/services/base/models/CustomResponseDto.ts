export interface CustomResponseDto<T> {
    items(items: any): unknown;
    data: T;
    statusCode: number;
    isSuccess: boolean;
  }
  