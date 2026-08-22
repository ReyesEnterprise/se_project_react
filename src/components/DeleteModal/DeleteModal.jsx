import "./DeleteModal.css";
import closeBtn from "../../assets/closeGray.svg";

function DeleteModal({
  buttonText,
  activeModal,
  onClose,
  name,
  onDelete,
  card,
}) {
  return (
    <div>
      <div className={`modal ${activeModal === name ? "modal_opened" : ""}`}>
        <div className="modal__content deleteModal__content">
          <h2 className="modal__title deleteModal__title">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <button onClick={onClose} type="button" className="modal__close">
            <img src={closeBtn} alt="close btn" className="modal__close-img" />
          </button>
          <div className="deleteModal__actions">
            <button
              onClick={() => onDelete(card)}
              type="button"
              className="deleteModal__confirm"
            >
              Yes, delete item
            </button>
            <button
              onClick={onClose}
              type="button"
              className="deleteModal__cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
