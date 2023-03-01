import React from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <main className="content page__content">
        <section className="profile content__profile">
          <div className="profile__card">
            <button
              className="profile__editAvatar-button"
              type="button"
              aria-label="Изменить аватар"
              onClick={onEditAvatar}
            >
              <div
                className="profile__avatar"
                alt="Аватарка"
                style={{ backgroundImage: `url(${userAvatar})` }}
              />
            </button>
            <div className="profile__profile-info">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактирование данных"
                onClick={onEditProfile}
              ></button>
              <p className="profile__profession">{userDescription}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить картинку"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements" aria-label="Сетка фотографий">
          <ul className="elements__list">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  name={card.name}
                  link={card.link}
                  onCardClick={onCardClick}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
