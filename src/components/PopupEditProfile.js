import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditProfile({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
    >
      <label>
        <input
          required
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          name="name"
          id="name"
          className="popup__input popup__input_type_name"
        />
        <span className="popup__error" id="name-error"></span>
      </label>
      <label>
        <input
          required
          type="text"
          minLength="2"
          maxLength="200"
          placeholder="О Себе "
          name="about"
          id="proffesion"
          className="popup__input popup__input_type_profession"
        />
        <span className="popup__error" id="proffesion-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
