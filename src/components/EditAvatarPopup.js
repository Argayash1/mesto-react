import { useRef, useEffect } from 'react'
import useValidation from '../hooks/useValidation.js';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onCloseByClickOnOverlay, onUpdateAvatar, isLoading, loadingText }) {
  const ref = useRef(); // записываем объект, возвращаемый хуком, в переменную
  const { values, errors, formValid, onChange, resetValidation } = useValidation(); // данные для валидации

  useEffect(() => {
    resetValidation();
    ref.current.value = '';
  }, [isOpen, resetValidation]);

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
      submitButtonText={isLoading ? loadingText : "Сохранить"}
      isLoading={isLoading}
      isValid={!formValid}
    >
      <input
        type="url"
        ref={ref}
        value={values.url || ''}
        onChange={onChange}
        id="image-url"
        className="popup__input"
        name="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required />
      <span className="popup__error" id="image-url-error">{errors.url}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;