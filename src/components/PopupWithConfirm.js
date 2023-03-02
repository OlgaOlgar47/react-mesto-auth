import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm({ isOpen, onClose }) {
  return (
    <PopupWithForm
      className="popup__title_type_confirm"
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
    ></PopupWithForm>
  );
}

export default PopupWithConfirm;
