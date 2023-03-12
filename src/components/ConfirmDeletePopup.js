// import { useState, useEffect, useContext } from 'react'
import PopupWithForm from '../components/PopupWithForm.js';
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function ConfirmDeletePopup({ isOpen, onClose, onCloseByClickOnOverlay, card, onCardDelete, isLoading, loadingText }) {
    function handleSubmit(e) {
        e.preventDefault();
    
        onCardDelete(card)
      }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            isOpen={isOpen}
            onClose={onClose}
            onCloseByClickOnOverlay={onCloseByClickOnOverlay}
            onSubmit={handleSubmit}
            submitButtonText={isLoading ? loadingText : "Да"} />
    )
}

export default ConfirmDeletePopup;