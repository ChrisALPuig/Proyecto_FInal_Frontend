import { useEffect } from 'react';
import { useModal } from './ModalContext.tsx';
import { useAlert } from './AlertContext.tsx';

export const AlertModalConnector: React.FC = () => {
  const { openLoginModal } = useModal();
  const { setOpenLoginModal } = useAlert();

  useEffect(() => {
    setOpenLoginModal(() => openLoginModal);
  }, [openLoginModal, setOpenLoginModal]);

  return null;
};
