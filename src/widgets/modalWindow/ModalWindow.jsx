import React, { useEffect, useState } from "react";
import styles from "./ModalWindow.module.css";
const ModalWindow = ({ title, onClose, children, isOpen }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);
  useEffect(() => {
    setModalOpen(isOpen);
    document.exitPointerLock() 
  }, [isOpen]);
  return (
    <div
      className={`${styles.modal} ${modalOpen ? styles.open : ""}`}
    >
        
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalClose} onClick={() => setModalOpen(onClose)}>
          &times;
        </p>
        
          <div className={styles.modalBody}>{children}</div>

      </div>
    </div>
  );
};

export default ModalWindow;
