import { action, observable } from "mobx";
import { CustomError } from "../../services/base/exceptionModels/CustomError";

export class BaseStore{
    @observable formErrors: CustomError = {
        generalMessage: "",
        validationErrors: null,
        status: 0,
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