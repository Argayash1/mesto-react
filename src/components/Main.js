import avatar from '../images/profile-cousteau.jpg';

function Main() {
    return (
        <main className="content page__content">
        <section className="profile">
          <div className="profile__items">
            <button className="profile__avatar-button" type="button">
              <img className="profile__avatar" src={avatar} alt="Аватар пользователя" />
            </button>
            <div className="profile-info">
              <h1 className="profile-info__name">Жак-Ив Кусто</h1>
              <button className="profile-info__edit-button" type="button"></button>
              <p className="profile-info__profession">Исследователь океана</p>
            </div>
          </div>
          <button className="profile__add-button" type="button"></button>
        </section>
        <section className="elements content__elements">
          <ul className="elements-list"></ul>
        </section>
      </main>
    );
}

export default Main;  