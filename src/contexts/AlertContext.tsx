import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IonAlert } from '@ionic/react';

interface AlertOptions {
  header?: string;
  message: string;
  buttons?: Array<{
    text: string;
    handler?: () => void;
    role?: 'cancel' | 'destructive';
  }>;
  onDismiss?: () => void;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  showLoginRequiredAlert: () => void;
  showErrorAlert: (message: string) => void;
  showSuccessAlert: (message: string) => void;
  setOpenLoginModal: (fn: () => void) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertOptions>({
    message: '',
  });
  const [openLoginModal, setOpenLoginModal] = useState<() => void>(() => () => {
    window.location.href = '/login';
  });

  const showAlert = (options: AlertOptions) => {
    setAlertConfig(options);
    setIsOpen(true);
  };

  const showLoginRequiredAlert = () => {
    showAlert({
      header: 'Iniciar sesión requerido',
      message: 'Necesitas iniciar sesión para usar esta función.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ir a login',
          handler: () => {
            openLoginModal();
          },
        },
      ],
    });
  };

  const showErrorAlert = (message: string) => {
    showAlert({
      header: 'Error',
      message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });
  };

  const showSuccessAlert = (message: string) => {
    showAlert({
      header: 'Éxito',
      message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });
  };

  const handleDismiss = () => {
    setIsOpen(false);
    alertConfig.onDismiss?.();
  };

  return (
    <AlertContext.Provider value={{ showAlert, showLoginRequiredAlert, showErrorAlert, showSuccessAlert, setOpenLoginModal }}>
      {children}
      <IonAlert
        isOpen={isOpen}
        onDidDismiss={handleDismiss}
        header={alertConfig.header}
        message={alertConfig.message}
        buttons={alertConfig.buttons || [{ text: 'OK', role: 'cancel' }]}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};
