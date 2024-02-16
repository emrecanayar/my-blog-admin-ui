import styles from "./modal.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  children: React.ReactNode;
  title: string;
  isVisibleSaveButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  onSave,
  children,
  title,
  isVisibleSaveButton,
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div
            className={styles.closeIcon}
            onClick={onClose}
            aria-label="Close"
            role="button"
            tabIndex={0}
          >
            &times;
          </div>
          <h3>{title}</h3>
        </div>
        <hr />
        <div style={{ margin: "15px" }}>{children}</div>
        <hr />
        <div className={styles.modalFooter}>
          {isVisibleSaveButton && isVisibleSaveButton === true && (
            <button className={styles.saveButton} onClick={onSave}>
              Kaydet
            </button>
          )}
          <button className={styles.closeButton} onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
