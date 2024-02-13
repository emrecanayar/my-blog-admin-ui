import { action, observable } from "mobx";
import { UserForLoginDto } from "../../services/auth/dtos/userForLoginDto";
import authService from "../../services/auth/authService";
import { CustomError } from "../../services/base/exceptionModels/CustomError";
import { LoggedHttpResponse } from "../../services/auth/dtos/loggedHttpResponse";

export class AuthStore {
  @observable formErrors: CustomError = {
    generalMessage: "",
    validationErrors: null,
    status: 0,
  };

  @observable loggedHttpResponse: LoggedHttpResponse = {} as LoggedHttpResponse;

  @action
  login = async (login: UserForLoginDto) => {
    try {
      this.clearFormErrors();
      var response = await authService.login(login);
      this.loggedHttpResponse = response;
      return response;
    } catch (error: any) {
      if (error.status && error.generalMessage && error.validationErrors) {
        // API'den gelen hata mesajlarını formErrors'a atayın
        this.setFormErrors(error);
        console.log("Errors", this.formErrors);
      } else {
        // Genel bir hata mesajı
        this.setFormErrors({
          generalMessage: "An unexpected error occurred.",
          validationErrors: null,
          status: error.status,
        });
      }
      throw error; // Hataları component'e de iletebiliriz
    }
  };

  @action
  setFormErrors = (errors: CustomError) => {
    this.formErrors = errors;
  };

  @action
  clearFormErrors = () => {
    this.formErrors = { generalMessage: "", validationErrors: null, status: 0 };
  };
}
const authStore = new AuthStore();
export default authStore;
