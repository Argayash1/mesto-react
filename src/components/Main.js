import avatar from '../images/profile-cousteau.jpg';

function handleEditAvatarClick() {
  document.querySelector('.popup_type_new-avatar').classList.add('popup_is-opened');
}

function handleEditProfileClick() {
  document.querySelector('.popup_type_profile').classList.add('popup_is-opened');
}

function handleAddPlaceClick() {
  document.querySelector('.popup_type_card').classList.add('popup_is-opened');
}


function Main() {
    return (
        <main className="content page__content">
        <section className="profile">
          <div className="profile__items">
            <button className="profile__avatar-button" type="button">
              <img className="profile__avatar" src={avatar} alt="Аватар пользователя" onClick={handleEditAvatarClick} />
            </button>
            <div className="profile-info">
              <h1 className="profile-info__name">Жак-Ив Кусто</h1>
              <button className="profile-info__edit-button" type="button" onClick={handleEditProfileClick}></button>
              <p className="profile-info__profession">Исследователь океана</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
        </section>
        <section className="elements content__elements">
          <ul className="elements-list"></ul>
        </section>
      </main>
    );
}

export default Main;  