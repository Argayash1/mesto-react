import React from 'react';
import avatar from '../images/profile-cousteau.jpg';
import { api } from '../utils/Api.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUsername] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setuserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{name, about, avatar}, cardsData]) => {
        setUsername(name);
        setUserDescription(about);
        setuserAvatar(avatar);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__items">
          <button className="profile__avatar-button" type="button">
            <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" onClick={onEditAvatar} />
          </button>
          <div className="profile-info">
            <h1 className="profile-info__name">{userName}</h1>
            <button className="profile-info__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile-info__profession">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements content__elements">
        <ul className="elements-list">
          {cards.map((card) => {
       return (   <li className="element" key={card._id}>
            <button className="element__delete-button" type="button"></button>
            <img className="element__image" src={card.link} alt={card.name} />
            <div className="element__info">
              <h3 className="element__title">{card.name}</h3>
              <button className="element__like-button" type="button"></button>
              <span className="element__count-likes">{card.likes.length}</span>
            </div>
          </li>)
        }
        )}
        </ul>
      </section>
    </main>
  );
}

export default Main;  