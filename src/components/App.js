import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
      <section className="popup popup_type_profile">
        <div className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup__form popup__form_type_profile" name="profile-popupform" novalidate>
            <input type="text" id="name" className="popup__input" name="name" placeholder="Имя" autocomplete="off" required
              minlength="2" maxlength="40" />
            <span className="popup__error" id="name-error"></span>
            <input type="text" id="profession" className="popup__input" name="about" placeholder="Профессия" autocomplete="off"
              required minlength="2" maxlength="200" />
            <span className="popup__error" id="profession-error"></span>
            <button className="popup__save" type="submit">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_card">
        <div className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">Новое место</h2>
          <form className="popup__form popup__form_type_card" name="card-popupform" novalidate>
            <input type="text" id="title" className="popup__input" name="place" placeholder="Название" autocomplete="off"
              required minlength="2" maxlength="30" />
            <span className="popup__error" id="title-error"></span>
            <input type="url" id="url" className="popup__input" name="url" placeholder="Ссылка на картинку" autocomplete="off"
              required />
            <span className="popup__error" id="url-error"></span>
            <button className="popup__save" type="submit">Создать</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_image">
        <div className="popup__image-container">
          <button className="popup__close" type="button"></button>
          <img className="popup__photo" src="#" alt="#" />
          <p className="popup__caption"></p>
        </div>
      </section>
      <section className="popup popup_type_delete-card">
        <div className="popup__container">
          <button className="popup__close popup__close_type_delete-card" type="button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="popup__form popup__form_type_delete-card" name="delete-card-popupform" novalidate>
            <button className="popup__save popup__save_type_delete-card" type="submit">Да</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_new-avatar">
        <div className="popup__container">
          <button className="popup__close popup__close_type_new-avatar" type="button"></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="popup__form popup__form_type_card" name="new-avatar-popupform" novalidate>
            <input type="url" id="image-url" className="popup__input" name="url" placeholder="Ссылка на картинку"
              autocomplete="off" required />
            <span className="popup__error" id="image-url-error"></span>
            <button className="popup__save" type="submit">Сохранить</button>
          </form>
        </div>
      </section>
      <section className="popup popup_type_view-avatar">
        <div className="popup__image-container">
          <button className="popup__close" type="button"></button>
          <img className="popup__photo" src="#" alt="#" />
          <p className="popup__caption"></p>
        </div>
      </section>
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
