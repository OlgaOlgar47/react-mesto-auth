import { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithConfirm from "./PopupWithConfirm.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as Auth from "./Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setFailPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        Auth.getContent(token)
          .then((res) => {
            if (res) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [setEmail, setLoggedIn, navigate]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  const handleConfirmPopupClick = (card) => {
    setSelectedCard(card._id);
    setConfirmPopupOpen("popup_opened");
  };

  const openPopupInfoSucces = () => {
    setSuccessPopupOpen("popup_opened");
  };

  const openPopupInfoFail = () => {
    setFailPopupOpen("popup__opened");
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
    setSuccessPopupOpen(false);
    setFailPopupOpen(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    (!isLiked ? api.likeCard(card._id) : api.deleteLike(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        const updatedCards = cards.filter((i) => i._id !== cardId);
        setCards(updatedCards);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .editUserData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ProtectedMain = () => {
    return (
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onDeleteClick={handleConfirmPopupClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        cards={cards}
      />
    );
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header onSignOut={handleSignOut} loggedIn={loggedIn} email={email} />
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                  openPopupInfo={openPopupInfoSucces}
                />
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <Login
                  title="Вход"
                  buttonText="Войти"
                  handleLogin={handleLogin}
                  openPopupInfo={openPopupInfoFail}
                />
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute element={ProtectedMain} loggedIn={loggedIn} />
              }
            ></Route>
          </Routes>
          <InfoTooltip
            name="infotooltip"
            isOpen={isSuccessPopupOpen}
            onClose={closeAllPopups}
            imagePath="http://localhost:3000/static/media/success.1b6082f862eac35e2514.svg"
            title="Вы успешно зарегистрировались!"
          />
          <InfoTooltip
            name="infotooltip"
            isOpen={isFailPopupOpen}
            onClose={closeAllPopups}
            imagePath="http://localhost:3000/static/media/fail.df8eddf661ff88f2d0ef.svg"
            title="Что-то пошло не так!
             Попробуйте ещё раз."
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithConfirm
            card={selectedCard}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
