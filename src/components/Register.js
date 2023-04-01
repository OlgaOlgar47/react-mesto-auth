import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import * as Auth from "./Auth";

function Register(props) {
  const { name, buttonText, title, openPopupInfo } = props;
  const navigate = useNavigate();
  const { values, errors, onChange } = useValidation();

  const onRegister = (e) => {
    e.preventDefault();
    Auth.register(values.email, values.password)
      .then((res) => {
        openPopupInfo();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="authorization">
      <div className="popup__container popup__container_type_auth">
        <form
          className="popup__form"
          name={name}
          onSubmit={onRegister}
          noValidate
        >
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
          <Link to="/sign-in" className="authorization__span">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
