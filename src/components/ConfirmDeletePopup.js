import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

function ConfirmDeletePopup({
  isOpen,
  onClose,
  card,
  onCardDelete,
  isLoading,
  loadingText,
  name,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title="Вы уверены?"
        name={name}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitButtonText={isLoading ? loadingText : "Да"}
      />
    </Popup>
  );
}

export default ConfirmDeletePopup;
