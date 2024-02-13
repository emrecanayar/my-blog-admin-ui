export interface Filter {
    field: string;
    operator: string;
    value?: string;
    logic?: string;
    filters?: Filter[];
  }