import apiService from "../base/apiService";
import { LoggedHttpResponse } from "./dtos/loggedHttpResponse";
import { UserForLoginDto } from "./dtos/userForLoginDto";

class AuthService {
  login = async (login: UserForLoginDto): Promise<LoggedHttpResponse> => {
    try {
      let response = await apiService.post("/Auth/Login", login);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const authService = new AuthService();
export default authService;
