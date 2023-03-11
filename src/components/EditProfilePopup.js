import React, { useState, useEffect, useContext } from 'react'
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onCloseByClickOnOverlay, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
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
            submitButtonText="Сохранить"
        >
            <input
                type="text"
                value={name || ''}
                onChange={handleChangeName}
                id="name"
                className="popup__input"
                name="name"
                placeholder="Имя"
                autoComplete="off"
                required
                minLength="2"
                maxLength="40" />
            <span className="popup__error" id="name-error"></span>
            <input
                type="text"
                value={description || ''}
                onChange={handleChangeDescription}
                id="profession"
                className="popup__input"
                name="about"
                placeholder="Профессия"
                autoComplete="off"
                required
                minLength="2"
                maxLength="200" />
            <span className="popup__error" id="profession-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;