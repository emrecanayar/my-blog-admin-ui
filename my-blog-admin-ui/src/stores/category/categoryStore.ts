import { action, observable, runInAction } from "mobx";
import { GetListCategoryListItemDto } from "../../services/catagory/dtos/getListCategoryListItemDto";
import categoryService from "../../services/catagory/categoryService";
import { CreateCategoryCommand } from "../../services/catagory/dtos/createCategoryCommand";
import { CreatedCategoryResponse } from "../../services/catagory/dtos/createdCategoryResponse";

export class CategoryStore {
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
    let result = await categoryService.createCategory(data);
    this.addedCategory = result.data;
    return result;
  };
}
const categoryStore = new CategoryStore();
export default categoryStore;
