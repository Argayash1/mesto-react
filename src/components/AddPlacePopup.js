import React, { useState } from 'react'
import PopupWithForm from '../components/PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onCloseByClickOnOverlay, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    
    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        onAddPlace({
          name: name,
          link: link
        })
      }

    return (
        <PopupWithForm
            title="Новое место"
            name="card"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClickOnOverlay={onCloseByClickOnOverlay}
            onSubmit={handleSubmit}
            submitButtonText="Создать"
        >
            <input
                type="text"
                value={name}
                onChange={handleChangeName}
                id="title"
                className="popup__input"
                name="place"
                placeholder="Название"
                autoComplete="off"
                required
                minLength="2"
                maxLength="30" />
            <span className="popup__error" id="title-error"></span>
            <input
                type="url"
                value={link}
                onChange={handleChangeLink}
                id="url"
                className="popup__input"
                name="url"
                placeholder="Ссылка на картинку"
                autoComplete="off"
                required />
            <span className="popup__error" id="url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;