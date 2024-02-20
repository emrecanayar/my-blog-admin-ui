import { action, observable, runInAction } from "mobx";
import { GetListCategoryListItemDto } from "../../services/catagory/dtos/getListCategoryListItemDto";
import categoryService from "../../services/catagory/categoryService";
import { CreateCategoryCommand } from "../../services/catagory/dtos/createCategoryCommand";
import { CreatedCategoryResponse } from "../../services/catagory/dtos/createdCategoryResponse";
import { BaseStore } from "../base/baseStore";
import { GetByIdCategoryResponse } from "../../services/catagory/dtos/getByIdCategoryResponse";
import { DeletedCategoryResponse } from "../../services/catagory/dtos/deletedCategoryResponse";
import { UpdateCategoryCommand } from "../../services/catagory/dtos/updateCategoryCommand";
import { UpdatedCategoryResponse } from "../../services/catagory/dtos/updatedCategoryResponse";

export class CategoryStore extends BaseStore {
  @observable categories: GetListCategoryListItemDto[] = [];
  @observable addedCategory: CreatedCategoryResponse =
    {} as CreatedCategoryResponse;
  @observable updatedCategory: UpdatedCategoryResponse =
    {} as UpdatedCategoryResponse;
  @observable category: GetByIdCategoryResponse = {} as GetByIdCategoryResponse;
  @observable deletedCategory: DeletedCategoryResponse =
    {} as DeletedCategoryResponse;

  @action
  getCategories = async () => {
    let result = await categoryService.getCategories();
    runInAction(() => {
      this.categories = result.data.items;
    });
    return result;
  };

  @action
  createCategory = async (data: CreateCategoryCommand) => {
    try {
      let result = await categoryService.createCategory(data);
      this.addedCategory = result.data;
      return result;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  updateCategory = async (data: UpdateCategoryCommand) => {
    try {
      let result = await categoryService.updateCategory(data);
      this.updatedCategory = result.data;
      return result;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getCategory = async (id: string) => {
    try {
      let result = await categoryService.getCategory(id);
      this.category = result.data;
      return result;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  deleteCategory = async (id: string) => {
    try {
      let result = await categoryService.deleteCategory(id);
      this.deletedCategory = result.data;
      return result;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const categoryStore = new CategoryStore();
export default categoryStore;
