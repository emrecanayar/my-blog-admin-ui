import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
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
}
const categoryService = new CategoryService();
export default categoryService;
