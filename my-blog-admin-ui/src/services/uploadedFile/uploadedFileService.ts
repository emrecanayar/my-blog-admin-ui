import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { UploadedFileCreatedDto } from "./dtos/uploadedFileCreatedDto";

class UploadedFileService {
  uploadFile = async (
    formData: any
  ): Promise<CustomResponseDto<UploadedFileCreatedDto>> => {
    try {
      const response = await apiService.postFormData(
        "/UploadedFiles",
        formData
      );
      return response;
    } catch (error) {
      console.log("Categories yüklenirken bir hata oluştu", error);
      throw error;
    }
  };
}
const uploadedFileService = new UploadedFileService();
export default uploadedFileService;
