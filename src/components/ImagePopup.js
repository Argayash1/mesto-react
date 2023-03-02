function ImagePopup({card, onClose, onCloseByClickOnOverlay}) {
    return (
        <section className={`popup popup_type_image ${Object.keys(card).length !== 0 ? "popup_is-opened" : ""}`} onMouseDown={onCloseByClickOnOverlay}>
        <div className="popup__image-container">
          <button className="popup__close" type="button" onClick={onClose}></button>
          <img className="popup__photo" src={card.link} alt={card.name} />
          <p className="popup__caption">{card.name}</p>
        </div>
      </section> 
    )
}

export default ImagePopup;