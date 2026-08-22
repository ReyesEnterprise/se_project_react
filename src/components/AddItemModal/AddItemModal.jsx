import { useForm } from "../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ activeModal, onClose, onAddItem }) {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      onClose={onClose}
      activeModal={activeModal}
      onSubmit={handleSubmit}
      buttonText="Add Garment"
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          Hot
          <input
            type="radio"
            name="weather"
            checked={values.weather === "hot"}
            className="modal__radio-input"
            id="hot"
            value="hot"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          Warm
          <input
            type="radio"
            name="weather"
            checked={values.weather === "warm"}
            className="modal__radio-input"
            id="warm"
            value="warm"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          Cold
          <input
            type="radio"
            name="weather"
            checked={values.weather === "cold"}
            className="modal__radio-input"
            id="cold"
            value="cold"
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
