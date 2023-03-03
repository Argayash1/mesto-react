import React, { useState, useEffect } from 'react'
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const states = [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isDeletePopupOpen];
  const isAnyStatesTrue = states.some(state => state === true);

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

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(!isDeletePopupOpen)
  }

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
    <div className="page">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDeleteCardClick={handleDeleteCardClick} />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
        submitButtonText="Сохранить"
      >
        <input
          type="text"
          id="name"
          className="popup__input"
          name="name"
          placeholder="Имя"
          autoComplete="off"
          required
          minLength="2"
          maxLength="40" />
        <span className="popup__error" id="name-error"></span>
        <input
          type="text"
          id="profession"
          className="popup__input"
          name="about"
          placeholder="Профессия"
          autoComplete="off"
          required
          minLength="2"
          maxLength="200" />
        <span className="popup__error" id="profession-error"></span>
      </PopupWithForm>

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
  );
}

export default App;
