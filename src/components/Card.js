import React from "react";

function Card({ card, onCardClick, onDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="elements__item">
      <div
        className="elements__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <button
        className="elements__trash"
        type="button"
        onClick={onDeleteClick}
      ></button>
      <div className="elements__bottom-block">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-container">
          <button
            className="elements__like-button"
            type="button"
            aria-label="Мне нравится"
          ></button>
          <p className="elements__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
