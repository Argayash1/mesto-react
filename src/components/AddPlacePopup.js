import { useEffect } from 'react'
import useValidation from '../components/useValidation.js';
import PopupWithForm from '../components/PopupWithForm.js';


function AddPlacePopup({ isOpen, onClose, onCloseByClickOnOverlay, onAddPlace, isLoading, loadingText }) {
    const { values, errors, formValid, onChange, resetValidation } = useValidation();

    useEffect(() => {
        resetValidation();
    }, [isOpen, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: values.name,
            link: values.link
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
            submitButtonText={isLoading ? loadingText : "Создать"}
            isLoading={isLoading}
            isValid={!formValid}
        >
            <input
                type="text"
                value={values.name || ''}
                onChange={onChange}
                id="title"
                className="popup__input"
                name="name"
                placeholder="Название"
                autoComplete="off"
                required
                minLength="2"
                maxLength="30" />
            <span className={`popup__error ${errors.name !== "" && "popup__error_visible"}`} id="title-error" name="name">{errors.name}</span>
            <input
                type="url"
                value={values.link || ''}
                onChange={onChange}
                id="url"
                className="popup__input"
                name="link"
                placeholder="Ссылка на картинку"
                autoComplete="off"
                required />
            <span className={`popup__error ${errors.link !== "" && "popup__error_visible"}`} id="url-error" name="link">{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;