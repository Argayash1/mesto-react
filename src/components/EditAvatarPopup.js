import React, { useRef } from 'react'
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onCloseByClickOnOverlay, onUpdateAvatar}) {
    const ref = useRef(); // записываем объект, возвращаемый хуком, в переменную
    
    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: ref.current.value
        });
      }

    return (
        <PopupWithForm
        title="Обновить аватар"
        name="new-avatar"
        isOpen={isOpen}
        onClose={onClose}
        onCloseByClickOnOverlay={onCloseByClickOnOverlay}
        onSubmit={handleSubmit}
        submitButtonText="Сохранить"
      >
        <input
          type="url"
          ref={ref}
          id="image-url"
          className="popup__input"
          name="url"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required />
        <span className="popup__error" id="image-url-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;