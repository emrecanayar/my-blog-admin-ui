export interface UpdateCategoryCommand {
  id: string;
  name: string;
  description: string;
  isPopular: boolean;
  uploadedFileId: string;
}
