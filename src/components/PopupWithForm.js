function PopupWithForm({title, name, children}) {
    return (
        <section className={`popup popup_type_${name}`}>
        <div className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form popup__form_type_profile" name={`${name}`} noValidate>
            {children}
            <button className="popup__save" type="submit">Сохранить</button>
          </form>
        </div>
      </section>
    );
}

export default PopupWithForm;