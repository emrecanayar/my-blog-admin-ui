import { action, observable, runInAction } from "mobx";
import { GetListCategoryListItemDto } from "../../services/catagory/dtos/getListCategoryListItemDto";
import categoryService from "../../services/catagory/categoryService";

export class CategoryStore {
  @observable categories: GetListCategoryListItemDto[] = [];

  @action
  getCategories = async () => {
    let result = await categoryService.getCategories();
    runInAction(() => {
      this.categories = result.data.items;
    });
    return result;
  };
}
const categoryStore = new CategoryStore();
export default categoryStore;
