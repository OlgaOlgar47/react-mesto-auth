import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  const { onLogin, values, errors, onChange } = props;

  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onLogin={onLogin}
      errors={errors}
      values={values}
      onChange={onChange}
    ></AuthForm>
  );
}

export default Login;
