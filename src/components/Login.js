import React from "react";
import useValidation from "../hooks/useValidation";
import * as Auth from "./Auth";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { name, buttonText, title, handleLogin, openPopupInfo } = props;
  const navigate = useNavigate();
  const { values, errors, onChange, setValues } = useValidation();

  const onLogin = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    Auth.authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setValues({ email: "", password: "" });
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        openPopupInfo();
        console.log(err);
      });
  };

  return (
    <div className="authorization">
      <div className="popup__container popup__container_type_auth">
        <form className="popup__form" name={name} onSubmit={onLogin} noValidate>
          <h2 className="popup__title popup__title_type_auth">{title}</h2>
          <label>
            <input
              required
              type="email"
              minLength="2"
              maxLength="40"
              placeholder="Email"
              name="email"
              id="email"
              className="popup__input popup__input_type_auth"
              onChange={onChange}
              value={values.email || ""}
            />
            <span className="popup__error" id="email-error">
              {errors.email || ""}
            </span>
          </label>
          <label>
            <input
              required
              type="password"
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              name="password"
              id="password"
              className="popup__input popup__input_type_auth"
              onChange={onChange}
              value={values.password || ""}
            />
            <span className="popup__error" id="password-error">
              {errors.password || ""}
            </span>
          </label>
          <button
            type="submit popup__submit_type_auth"
            className="popup__submit popup__submit_type_auth"
            aria-label={title}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
