// react import component
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// default values / api key
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// my component
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { addItem, getItems, removeItem } from "../../utils/api";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";

// component app function
function App() {
  // state of weatherData, activeCard, selectedCard

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  // state and setState
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //  arrow function to handle toggle temp
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // function adding adding "preview" and setting state for current card
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // function adding adding "add-garment"
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // function adding adding "add-garment"
  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  // add Item function
  const onAddItem = (data, resetForm) => {
    addItem(data)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        if (typeof resetForm === "function") resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Delete Item Function
  const handleDeleteItem = (item) => {
    removeItem(item._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((currentItem) => currentItem._id !== item._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  //  useEffect to handle api call
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        // Show newest items first (reverse server order)
        setClothingItems(Array.isArray(data) ? [...data].reverse() : []);
      })
      .catch(console.error);
  }, []);

  //  return jsx
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          {/* Routes - main(root) / profile */}
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          {/* footer */}
          <Footer />
        </div>
        {/* modals for adding items form, the items themself and confirm delete modals */}
        <AddItemModal
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteClick={handleDeleteClick}
          name="preview"
        />
        <DeleteModal
          onDelete={handleDeleteItem}
          activeModal={activeModal}
          onClose={closeActiveModal}
          name="delete"
          card={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
