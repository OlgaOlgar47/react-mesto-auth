import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupEditProfile from "./PopupEditProfile.js";
import PopupEditAvatar from "./PopupEditAvatar.js";
import PopupAddCard from "./PopupAddCard.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen("popup_opened");
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen("popup_opened");
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen("popup_opened");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({});
  };

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupAddCard isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <div className="popup popup_type_confirm">
          <div className="popup__container">
            <button className="popup__close" type="button"></button>
            <form className="popup__form">
              <h2 className="popup__title popup__title_type_confirm">
                Вы уверены?
              </h2>
              <button
                type="submit"
                className="popup__submit"
                aria-label="Да уверен"
              >
                Да
              </button>
            </form>
          </div>
        </div>
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
