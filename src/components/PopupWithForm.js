function PopupWithForm({title, name, children, isOpen, onClose, onCloseByClickOnOverlay, onSubmit, submitButtonText, isLoading, isValid}) {
  const submitButtonDisable = (
    (isLoading || isValid) && true
  );

  const submitButtonClassName = (
    `popup__save ${isValid && 'popup__save_disabled'}`
  );

    return (
        <section className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`} onMouseDown={onCloseByClickOnOverlay}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form popup__form_type_profile" name={`${name}`} onSubmit={onSubmit} noValidate>
            {children}
            <button className={submitButtonClassName} type="submit" disabled={submitButtonDisable}>{submitButtonText}</button>
          </form>
        </div>
      </section>
    );
}

export default PopupWithForm;