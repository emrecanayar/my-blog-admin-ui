import { action, observable, runInAction } from "mobx";
import { GetListCategoryListItemDto } from "../../services/catagory/dtos/getListCategoryListItemDto";
import categoryService from "../../services/catagory/categoryService";
import { CreateCategoryCommand } from "../../services/catagory/dtos/createCategoryCommand";
import { CreatedCategoryResponse } from "../../services/catagory/dtos/createdCategoryResponse";
import { BaseStore } from "../base/baseStore";

export class CategoryStore extends BaseStore {
  @observable categories: GetListCategoryListItemDto[] = [];
  @observable addedCategory: CreatedCategoryResponse =
    {} as CreatedCategoryResponse;

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
      if (error.status && error.generalMessage && error.validationErrors) {
        this.setFormErrors(error);
        console.log("Errors", this.formErrors);
      } else {
        this.setFormErrors({
          generalMessage: "An unexpected error occurred.",
          validationErrors: null,
          status: error.status,
        });
      }
      throw error;
    }
  };
}
const categoryStore = new CategoryStore();
export default categoryStore;
