import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Cargando...', fullScreen = false }) => {
  return (
    <div className={`loading-spinner-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-spinner-content">
        <IonSpinner name="crescent" color="primary" />
        <IonText className="loading-spinner-text">
          <p>{message}</p>
        </IonText>
      </div>
    </div>
  );
};

export default LoadingSpinner;
