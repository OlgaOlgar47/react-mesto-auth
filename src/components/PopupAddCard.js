import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="add"
      buttonText="Создать"
    >
      <label>
        <input
          required
          minLength="2"
          maxLength="30"
          type="text"
          placeholder="Название"
          name="name"
          id="placeName"
          className="popup__input popup__input_type_card-name"
        />
        <span className="popup__error" id="placeName-error"></span>
      </label>
      <label>
        <input
          required
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          id="link"
          className="popup__input popup__input_type_card-link"
        />
        <span className="popup__error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default PopupAddCard;
