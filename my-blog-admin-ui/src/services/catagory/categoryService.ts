import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { CreateCategoryCommand } from "./dtos/createCategoryCommand";
import { CreatedCategoryResponse } from "./dtos/createdCategoryResponse";
import { DeletedCategoryResponse } from "./dtos/deletedCategoryResponse";
import { GetByIdCategoryResponse } from "./dtos/getByIdCategoryResponse";
import { GetListCategoryListItemDto } from "./dtos/getListCategoryListItemDto";
import { UpdateCategoryCommand } from "./dtos/updateCategoryCommand";
import { UpdatedCategoryResponse } from "./dtos/updatedCategoryResponse";

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

  updateCategory = async (
    updateCategoryCommand: UpdateCategoryCommand
  ): Promise<CustomResponseDto<UpdatedCategoryResponse>> => {
    try {
      const response = await apiService.put(
        "/Categories",
        updateCategoryCommand
      );
      return response;
    } catch (error) {
      console.log("Kategori günceleme işlemi sırasında bir hata oluştu", error);
      throw error;
    }
  };

  getCategory = async (
    id: string
  ): Promise<CustomResponseDto<GetByIdCategoryResponse>> => {
    try {
      const response = await apiService.get(`/Categories/${id}`);
      return response;
    } catch (error) {
      console.log("Category yüklenirken bir hata oluştu", error);
      throw error;
    }
  };

  deleteCategory = async (
    id: string
  ): Promise<CustomResponseDto<DeletedCategoryResponse>> => {
    try {
      const response = await apiService.delete(`/Categories/${id}`);
      return response;
    } catch (error) {
      console.log("Category silinirken bir hata oluştu", error);
      throw error;
    }
  };


}
const categoryService = new CategoryService();
export default categoryService;
