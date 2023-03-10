import React, { useState, useEffect } from 'react'
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import ImagePopup from '../components/ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const states = [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isDeletePopupOpen];
  const isAnyStatesTrue = states.some(state => state === true);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])


  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }

    if (isAnyStatesTrue || Object.keys(selectedCard).length > 0) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isAnyStatesTrue, selectedCard])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  // function handleDeleteCardClick() {
  //   setIsDeletePopupOpen(!isDeletePopupOpen)
  // }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setIsDeletePopupOpen(false)
  }

  function closeAllPopupsByCliclOnOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay} />
        
        <PopupWithForm
          title="Новое место"
          name="card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
          submitButtonText="Создать"
        >
          <input
            type="text"
            id="title"
            className="popup__input"
            name="place"
            placeholder="Название"
            autoComplete="off"
            required
            minLength="2"
            maxLength="30" />
          <span className="popup__error" id="title-error"></span>
          <input
            type="url"
            id="url"
            className="popup__input"
            name="url"
            placeholder="Ссылка на картинку"
            autoComplete="off"
            required />
          <span className="popup__error" id="url-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Обновить аватар"
          name="new-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
          submitButtonText="Сохранить"
        >
          <input
            type="url"
            id="image-url"
            className="popup__input"
            name="url"
            placeholder="Ссылка на картинку"
            autoComplete="off"
            required />
          <span className="popup__error" id="image-url-error"></span>
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
          submitButtonText="Да"
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
