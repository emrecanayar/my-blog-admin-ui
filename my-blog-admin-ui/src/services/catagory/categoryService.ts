import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { CreateCategoryCommand } from "./dtos/createCategoryCommand";
import { CreatedCategoryResponse } from "./dtos/createdCategoryResponse";
import { GetListCategoryListItemDto } from "./dtos/getListCategoryListItemDto";

class CategoryService {
  getCategories = async (): Promise<
    CustomResponseDto<GetListResponse<GetListCategoryListItemDto>>
  > => {
    try {
      const response = await apiService.get("/Categories");
      return response;
    } catch (error) {
      console.log("Categories yüklenirken bir hata oluştu", error);
      throw error;
    }
  };

  createCategory = async (
    data: CreateCategoryCommand
  ): Promise<CustomResponseDto<CreatedCategoryResponse>> => {
    try {
      const response = await apiService.post("/Categories", data);
      return response;
    } catch (error) {
      console.log("Categories eklenirken bir hata oluştu", error);
      throw error;
    }
  };
}
const categoryService = new CategoryService();
export default categoryService;
