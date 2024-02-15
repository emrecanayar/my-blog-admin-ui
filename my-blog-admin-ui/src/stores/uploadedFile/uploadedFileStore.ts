import { action, observable } from "mobx";
import { UploadedFileCreatedDto } from "../../services/uploadedFile/dtos/uploadedFileCreatedDto";
import uploadedFileService from "../../services/uploadedFile/uploadedFileService";
import { BaseStore } from "../base/baseStore";

export class UploadedFileStore extends BaseStore {
  @observable uploadedFile: UploadedFileCreatedDto =
    {} as UploadedFileCreatedDto;

  @action
  uploadFile = async (formData: any) => {
    try {
      let result = await uploadedFileService.uploadFile(formData);
      this.uploadedFile = result.data;
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
const uploadedFileStore = new UploadedFileStore();
export default uploadedFileStore;
