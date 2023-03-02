import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="updateAvatar"
    >
      <label>
        <input
          required
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar"
          id="avatar"
          className="popup__input popup__input_type_avatar"
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;
