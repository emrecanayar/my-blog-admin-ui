import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { UserForLoginDto } from "../../services/auth/dtos/userForLoginDto";
import { useState } from "react";
import authStore from "../../stores/auth/authStore";
import { ToastContainer, toast } from "react-toastify";
import { observer } from "mobx-react";

const Login = observer(() => {
  const [loginModel, setLoginModel] = useState<UserForLoginDto>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginModel({
      ...loginModel,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      var result = await authStore.login(loginModel);
      if (result?.accessToken.token !== null) {
        window.location.href = "/";
        localStorage.setItem('token', result.accessToken.token);
      }
    } catch (error: any) {
      console.log("Error", error);

      if (error.validationErrors) {
        error.validationErrors.forEach((valError: any) => {
          valError.Errors.forEach((errMsg: any) => {
            toast.warning(errMsg);
          });
        });
      } else if (error.generalMessage && error.validationErrors === null) {
        toast.error(error.generalMessage);
      }
    }
  };
  return (
    <div>
      <div className={styles.bodyLogin}>
        <div className={styles.center}>
          <h1>Giriş Yap</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.txtField}>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={loginModel.email}
              />
              <span></span>
              <label>E-Posta</label>
            </div>
            <div className={styles.txtField}>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={loginModel.password}
              />
              <span></span>
              <label>Şifre</label>
            </div>
            <div className={styles.pass}>Şifremi Unuttum?</div>
            <input type="submit" value="Giriş Yap" />
            <div className={styles.signupLink}>
              Üye değil misin? <Link to="#">Üye Ol</Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
});
export default Login;
