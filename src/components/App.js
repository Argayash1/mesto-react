import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "../components/AddPlacePopup.js";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup.js";
import ImagePopup from "../components/ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  // Спасибо большое, ну как же я мог не подумать, что при одной переменной перерисовываются все попапы!
  const [isEditProfilePopupLoading, setIsEditProfilePopuploading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopuploading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopuploading] = useState(false);
  const [isDeletePopupLoading, setIsDeletePopuploading] = useState(false);
  const [editProfilePopupLoadingText, setEditProfilePopupLoadingText] = useState("");
  const [addPlacePopupLoadingText, setAddPlacePopupLoadingText] = useState("");
  const [editAvatarPopupLoadingText, setEditAvatarPopupLoadingText] = useState("");
  const [deletePopuploadingText, setDeletePopupLoadingText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(setIsEditProfilePopuploading, true, setEditProfilePopupLoadingText);
    api
      .editProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoading(setIsEditProfilePopuploading, true, setEditProfilePopupLoadingText, "Сохранено!");
        setTimeout(closeAllPopups, 1000);
      })
      .catch((err) => {
        setIsLoading(setIsEditProfilePopuploading, true, setEditProfilePopupLoadingText, "Ошибка запроса!");
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsEditProfilePopuploading, false, setEditProfilePopupLoadingText);
        }, 1500);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(setIsEditAvatarPopuploading, true, setEditAvatarPopupLoadingText);
    api
      .addNewAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoading(setIsEditAvatarPopuploading, true, setEditAvatarPopupLoadingText, "Сохранено!");
        setTimeout(closeAllPopups, 1000);
      })
      .catch((err) => {
        setIsLoading(setIsEditAvatarPopuploading, true, setEditAvatarPopupLoadingText, "Ошибка запроса!");
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsEditAvatarPopuploading, false, setEditAvatarPopupLoadingText);
        }, 1500);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(setIsAddPlacePopuploading, true, setAddPlacePopupLoadingText);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsLoading(setIsAddPlacePopuploading, true, setAddPlacePopupLoadingText, "Создано!");
        setTimeout(closeAllPopups, 1000);
      })
      .catch((err) => {
        setIsLoading(setIsAddPlacePopuploading, true, setAddPlacePopupLoadingText, "Ошибка запроса!");
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsAddPlacePopuploading, false, setAddPlacePopupLoadingText);
        }, 1500);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(setIsDeletePopuploading, true, setDeletePopupLoadingText, "Удаление...");
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setIsLoading(setIsDeletePopuploading, true, setDeletePopupLoadingText, "Удалено!");
        setTimeout(closeAllPopups, 1000);
      })
      .catch((err) => {
        setIsLoading(setIsDeletePopuploading, true, setDeletePopupLoadingText, "Ошибка запроса!");
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsDeletePopuploading, false, setDeletePopupLoadingText);
        }, 1500);
      });
  }

  function setIsLoading(setIsPopupLoading, isPopupLoading, setLoadingText, loadingText = "Сохранение...") {
    setIsPopupLoading(isPopupLoading);
    setLoadingText(loadingText);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isEditProfilePopupLoading}
            loadingText={editProfilePopupLoadingText}
            name="profile"
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isAddPlacePopupLoading}
            loadingText={addPlacePopupLoadingText}
            name="card"
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isEditAvatarPopupLoading}
            loadingText={editAvatarPopupLoadingText}
            name="new-avatar"
          />

          <ConfirmDeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            card={cardToDelete}
            onCardDelete={handleCardDelete}
            isLoading={isDeletePopupLoading}
            loadingText={deletePopuploadingText}
            name="delete-card"
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} name="image" />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
