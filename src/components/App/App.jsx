import { useEffect, useState } from "react";
import { coordinates, APIKey } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  // state of weatherData, activeCard, selectedCard

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  //  arrow function to handle ...

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  //  useEffect

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filterdata = filterWeatherData(data);
        setWeatherData(filterdata);
      })
      .catch(console.error);
  }, []);

  //  return jsx
  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              id="hot"
            />
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              id="warm"
            />
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              id="cold"
            />
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
