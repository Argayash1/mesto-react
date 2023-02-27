import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from '../components/ImagePopup.js';

let isEditProfilePopupOpen = false;
let isAddPlacePopupOpen = false;
let isEditAvatarPopupOpen = false;

function handleEditAvatarClick() {
  document.querySelector('.popup_type_new-avatar').classList.add('popup_is-opened');
}

function handleEditProfileClick() {
  document.querySelector('.popup_type_profile').classList.add('popup_is-opened');
}

function handleAddPlaceClick() {
  document.querySelector('.popup_type_card').classList.add('popup_is-opened');
}

function App() {
  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        children={[<>
          <input type="text" id="name" className="popup__input" name="name" placeholder="Имя" autoComplete="off" required
            minLength="2" maxLength="40" />
          <span className="popup__error" id="name-error"></span>
          <input type="text" id="profession" className="popup__input" name="about" placeholder="Профессия" autoComplete="off"
            required minLength="2" maxLength="200" />
          <span className="popup__error" id="profession-error"></span>
        </>]} />
      <PopupWithForm
        title="Новое место"
        name="card"
        children={[<>
          <input type="text" id="title" className="popup__input" name="place" placeholder="Название" autoComplete="off"
            required minLength="2" maxLength="30" />
          <span className="popup__error" id="title-error"></span>
          <input type="url" id="url" className="popup__input" name="url" placeholder="Ссылка на картинку" autoComplete="off"
            required />
          <span className="popup__error" id="url-error"></span>
        </>]} />
      <PopupWithForm
        title="Обновить аватар"
        name="new-avatar"
        children={[<>
          <input type="url" id="image-url" className="popup__input" name="url" placeholder="Ссылка на картинку"
            autoComplete="off" required />
          <span className="popup__error" id="image-url-error"></span>
        </>]} />
      <PopupWithForm
        title="Вы уверены?"
        name="delete-card"
        children={[]} />
      <ImagePopup />
      <template id="element-template">
        <li className="element">
          <button className="element__delete-button" type="button"></button>
          <img className="element__image" src="#" alt="#" />
          <div className="element__info">
            <h3 className="element__title"></h3>
            <button className="element__like-button" type="button"></button>
            <span className="element__count-likes"></span>
          </div>
        </li>
      </template>
    </div>
  );
}

export default App;
