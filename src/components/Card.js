function Card({card, onCardClick, onDeleteCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

    return (
        <li className="element">
        <button className="element__delete-button" type="button" onClick={onDeleteCardClick}></button>
        <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <div className="element__info">
          <h3 className="element__title">{card.name}</h3>
          <button className="element__like-button" type="button"></button>
          <span className="element__count-likes">{card.likes.length}</span>
        </div>
      </li>
    )
}

export default Card;