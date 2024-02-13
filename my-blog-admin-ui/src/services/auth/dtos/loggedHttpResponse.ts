import { AuthenticatorType } from "./authenticatorType";
import { AccessToken } from "./accessToken";

export interface LoggedHttpResponse {
  accessToken: AccessToken;
  authenticatorType: AuthenticatorType;
}
