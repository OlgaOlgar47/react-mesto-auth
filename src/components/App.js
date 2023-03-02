import { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupEditProfile from "./PopupEditProfile.js";
import PopupEditAvatar from "./PopupEditAvatar.js";
import PopupAddCard from "./PopupAddCard.js";
import PopupWithConfirm from "./PopupWithConfirm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleConfirmPopupClick = () => {
    setConfirmPopupOpen("popup_opened");
  };

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
    setConfirmPopupOpen(false);
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
          onDeleteClick={handleConfirmPopupClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupAddCard isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
