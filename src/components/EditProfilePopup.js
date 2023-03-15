import { useEffect, useContext } from 'react'
import useValidation from '../components/useValidation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onCloseByClickOnOverlay, onUpdateUser, isLoading, loadingText }) {
    const { values, errors, formValid, onChange, resetValidation } = useValidation();

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        resetValidation({name: currentUser.name, about: currentUser.about}, {}, true);
    }, [currentUser, isOpen, resetValidation]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClickOnOverlay={onCloseByClickOnOverlay}
            onSubmit={handleSubmit}
            submitButtonText={isLoading ? loadingText : "Сохранить"}
            isLoading={isLoading}
            isValid={!formValid}
        >
            <input
                type="text"
                value={values.name || ''}
                onChange={onChange}
                id="name"
                className="popup__input"
                name="name"
                placeholder="Имя"
                autoComplete="off"
                required
                minLength="2"
                maxLength="40" />
            <span className={`popup__error ${errors.name !== "" && "popup__error_visible"}`} id="name-error">{errors.name}</span>
            <input
                type="text"
                value={values.about || ''}
                onChange={onChange}
                id="profession"
                className="popup__input"
                name="about"
                placeholder="Профессия"
                autoComplete="off"
                required
                minLength="2"
                maxLength="200" />
            <span className={`popup__error ${errors.about !== "" && "popup__error_visible"}`} id="profession-error">{errors.about}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;