import React from 'react';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(false)
  }

  function closeAllPopupsByCliclOnOverlay(e) {
    if (e.target.classList.contains('popup_is-opened')) {
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
        onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        children={
          <>
            <input type="text" id="name" className="popup__input" name="name" placeholder="Имя" autoComplete="off" required
              minLength="2" maxLength="40" />
            <span className="popup__error" id="name-error"></span>
            <input type="text" id="profession" className="popup__input" name="about" placeholder="Профессия" autoComplete="off"
              required minLength="2" maxLength="200" />
            <span className="popup__error" id="profession-error"></span>
          </>}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
        submitButtonText="Сохранить"
      />

      <PopupWithForm
        title="Новое место"
        name="card"
        children={
          <>
            <input type="text" id="title" className="popup__input" name="place" placeholder="Название" autoComplete="off"
              required minLength="2" maxLength="30" />
            <span className="popup__error" id="title-error"></span>
            <input type="url" id="url" className="popup__input" name="url" placeholder="Ссылка на картинку" autoComplete="off"
              required />
            <span className="popup__error" id="url-error"></span>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
        submitButtonText="Создать"
      />

      <PopupWithForm
        title="Обновить аватар"
        name="new-avatar"
        children={<>
          <input type="url" id="image-url" className="popup__input" name="url" placeholder="Ссылка на картинку"
            autoComplete="off" required />
          <span className="popup__error" id="image-url-error"></span>
        </>}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
        submitButtonText="Сохранить"
      />

      <PopupWithForm
        title="Вы уверены?"
        name="delete-card"
        children={[]}
        onClose={closeAllPopups}
        onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay}
        submitButtonText="Да"
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} onCloseByClickOnOverlay={closeAllPopupsByCliclOnOverlay} />
    </div>
  );
}

export default App;
