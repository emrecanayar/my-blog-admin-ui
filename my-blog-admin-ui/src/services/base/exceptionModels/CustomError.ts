export interface CustomError {
    generalMessage: string;
    validationErrors: string[] | null;
    status: number;
  }
  