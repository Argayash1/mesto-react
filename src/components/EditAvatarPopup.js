import { useRef, useState } from 'react'
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onCloseByClickOnOverlay, onUpdateAvatar, isLoading, loadingText}) {
    const ref = useRef(); // записываем объект, возвращаемый хуком, в переменную
    const [isValid, setIsValid] = useState(false);

    function inputValidation() {
      if (!ref.validity.valid) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    };
    
    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: ref.current.value
        });

        setTimeout(() => {
          ref.current.value = '';
      }, 1500)
      }

    return (
        <PopupWithForm
        title="Обновить аватар"
        name="new-avatar"
        isOpen={isOpen}
        onClose={onClose}
        onCloseByClickOnOverlay={onCloseByClickOnOverlay}
        onSubmit={handleSubmit}
        submitButtonText={isLoading ? loadingText : "Сохранить"}
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