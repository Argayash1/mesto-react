function ImagePopup() {
    return (
        <section className="popup popup_type_image">
        <div className="popup__image-container">
          <button className="popup__close" type="button"></button>
          <img className="popup__photo" src="#" alt="#" />
          <p className="popup__caption"></p>
        </div>
      </section> 
    )
}

export default ImagePopup;