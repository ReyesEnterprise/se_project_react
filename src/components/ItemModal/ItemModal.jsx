import "./ItemModal.css";
import closeBtn from "../../assets/closeWhite.svg";

function ItemModal({
  activeModal,
  onClose,
  card,
  name,
  onDelete,
  handleDeleteClick,
}) {
  return (
    <div className={`modal ${activeModal === name ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="close btn" className="modal__close-img" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-title">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather : {card.weather}</p>
          </div>
          <div className="modal__footer-buttonContainer">
            <button
              type="button"
              className="modal__delete"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
