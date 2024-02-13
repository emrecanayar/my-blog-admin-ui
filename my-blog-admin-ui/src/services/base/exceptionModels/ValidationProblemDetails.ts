export interface ValidationProblemDetails {
    title: string;
    detail: string;
    errors: ValidationExceptionModel[];
    status: number;
    type: string;
  }
  
  export interface ValidationExceptionModel {
    property?: string;
    errors?: string[];
  }
  