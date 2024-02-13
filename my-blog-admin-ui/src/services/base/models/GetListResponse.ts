import { BasePageableModel } from "./BasePageableModel";

export interface GetListResponse<T> extends BasePageableModel {
    items: T[];
  }