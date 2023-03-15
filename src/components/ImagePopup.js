function ImagePopup({card, onClose, onCloseByClickOnOverlay}) {
  const isOpened = Object.keys(card).length !== 0;
  
    return (
        <section className={`popup popup_type_image ${isOpened && "popup_is-opened"}`} onMouseDown={onCloseByClickOnOverlay}>
        <div className="popup__image-container">
          <button className="popup__close" type="button" onClick={onClose}></button>
          <img className="popup__photo" src={card.link} alt={card.name} />
          <p className="popup__caption">{card.name}</p>
        </div>
      </section> 
    )
}

export default ImagePopup;