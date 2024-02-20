import { BasePageableModel } from "../../base/models/BasePageableModel";
import { GetListCategoryListItemDto } from "./getListCategoryListItemDto";

export interface CategoryListModel extends BasePageableModel {
    items: GetListCategoryListItemDto[];
  }
  