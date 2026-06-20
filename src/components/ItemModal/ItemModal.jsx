import "./ItemModal.css";
import closeBtn from "../../assets/closeWhite.svg";

function ItemModal({ activeModal, onClose, card, name }) {
  return (
    <div className={`modal ${activeModal === name ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="close btn" className="modal__close-img" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather:{card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
