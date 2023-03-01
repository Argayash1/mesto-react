import React from 'react';
// import avatar from '../images/profile-cousteau.jpg';
import { api } from '../utils/Api.js';
import Card from '../components/Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUsername] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setuserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ name, about, avatar }, cardsData]) => {
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
            return (
             <Card card={card} onCardClick={onCardClick} key={card._id} />
            )
          }
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;  