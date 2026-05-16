import React, { createContext, useContext, useState, ReactNode } from 'react';
import Login from '../components/auth/login.tsx';
import Register from '../components/auth/register.tsx';

interface ModalContextType {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
      }}
    >
      {children}
      {isLoginModalOpen && <LoginModalPortal />}
      {isRegisterModalOpen && <RegisterModalPortal />}
    </ModalContext.Provider>
  );
};

const LoginModalPortal: React.FC = () => {
  const { closeLoginModal } = useModal();
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
      <Login isModal={true} onClose={closeLoginModal} />
    </div>
  );
};

const RegisterModalPortal: React.FC = () => {
  const { closeRegisterModal } = useModal();
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
      <Register isModal={true} onClose={closeRegisterModal} />
    </div>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
