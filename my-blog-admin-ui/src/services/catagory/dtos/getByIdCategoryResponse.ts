import { GetListCategoryUploadedFileListItemDto } from "../../categoryUploadedFile/dtos/getListCategoryUploadedFileListItemDto";

export interface GetByIdCategoryResponse {
  id: string;
  name: string;
  description: string;
  isPopular: boolean;
  categoryUploadedFiles: GetListCategoryUploadedFileListItemDto[];
}
