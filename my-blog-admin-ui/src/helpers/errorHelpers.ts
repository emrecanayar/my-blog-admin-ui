import { toast } from "react-toastify";

export const handleApiError = (error: any) => {
  if (error.validationErrors) {
    error.validationErrors.forEach((valError: any) => {
      valError.Errors.forEach((errMsg: string) => {
        toast.warning(errMsg);
      });
    });
  } else if (error.generalMessage && error.validationErrors === null) {
    toast.error(error.generalMessage);
  } else {
    console.error("An unexpected error occurred", error);
    toast.error("Beklenmedik bir hata oluştu.");
  }
};
