import React, { useState, useEffect, useContext } from 'react'
import { api } from '../utils/Api.js';
import Card from '../components/Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteCardClick }) {
  const [cards, setCards] = useState([])
  const currentUser = useContext(CurrentUserContext);


  useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([cardsData]) => {
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
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" onClick={onEditAvatar} />
          </button>
          <div className="profile-info">
            <h1 className="profile-info__name">{currentUser.name}</h1>
            <button className="profile-info__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile-info__profession">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements content__elements">
        <ul className="elements-list">
          {cards.map((card) => {
            return (
              <Card card={card} onCardClick={onCardClick} onDeleteCardClick={onDeleteCardClick} key={card._id} />
            )
          }
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;  