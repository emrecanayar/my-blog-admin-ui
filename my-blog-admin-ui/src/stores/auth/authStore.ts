import { action, observable } from "mobx";
import { UserForLoginDto } from "../../services/auth/dtos/userForLoginDto";
import authService from "../../services/auth/authService";
import { LoggedHttpResponse } from "../../services/auth/dtos/loggedHttpResponse";
import { BaseStore } from "../base/baseStore";

export class AuthStore extends BaseStore {
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
const authStore = new AuthStore();
export default authStore;
