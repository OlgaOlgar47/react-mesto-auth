import React from "react";

function InfoTooltip(props) {
  const { name, isOpen, onClose, imagePath, title } = props;
  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div
          className="authorization__infotooltip-image"
          style={{ backgroundImage: `url(${imagePath})` }}
        ></div>
        <h2 className="popup__title popup__title_type_success">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
