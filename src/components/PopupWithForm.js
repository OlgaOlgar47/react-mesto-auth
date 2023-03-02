import React from "react";

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  className,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={name} noValidate>
          <h2 className={`popup__title ${className}`}>{title}</h2>
          {children}
          <button type="submit" className="popup__submit" aria-label={title}>
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
