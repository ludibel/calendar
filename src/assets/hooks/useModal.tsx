import { useState } from 'react';

// creation d'un hook useModal pour l'ouverture et la fermeture d'un composant modal
const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const toggleOpenings = () => {
    setOpenModal(!openModal);
  };
  return {
    openModal,
    toggleOpenings,
  };
};
export default useModal;
