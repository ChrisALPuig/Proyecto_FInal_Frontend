import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/apiConfig';
import Header from '../../components/Header/Header.tsx';
import { useNotification } from '../../contexts/NotificationContext.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './success.css';

const Success = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [processed, setProcessed] = useState(false);
  const { addNotification } = useNotification();
  const { token } = useAuth();

  useEffect(() => {
    // Evitar procesamiento duplicado
    if (processed) {
      return;
    }

    const recordPayment = async () => {
      const orderId = localStorage.getItem('orderId');
      const paymentId = localStorage.getItem('paymentId');
      const paymentPayload = localStorage.getItem('paymentPayload');
      
      if (!orderId) {
        setLoading(false);
        return;
      }

      // Marcar como procesado inmediatamente para evitar ejecución duplicada
      setProcessed(true);

      // Parsear el payload con todos los datos del pedido
      let payload: any = {
        orderId,
        paymentId,
        status: 'success',
        stripePaymentId: paymentId,
      };

      if (paymentPayload) {
        try {
          const parsedPayload = JSON.parse(paymentPayload);
          // Asegurar que todos los campos están incluidos
          payload = {
            ...parsedPayload,
            paymentId,
            status: 'success',
            stripePaymentId: paymentId,
          };
        } catch (e) {
          console.error('Error parsing payment payload:', e);
        }
      }

      try {
        const res = await fetch(`${API_ENDPOINTS.PAYMENTS}/record`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error('Failed to record payment', res.status);
        } else {
          console.log('Payment recorded for order', orderId);
          
          // Enviar email después de registrar el pago
          try {
            const emailRes = await fetch(`${API_ENDPOINTS.PAYMENTS}/send-email/${orderId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            });

            if (!emailRes.ok) {
              console.error('Failed to send email', emailRes.status);
            } else {
              console.log('Payment email sent for order', orderId);
            }
          } catch (emailErr) {
            console.error('Error sending email:', emailErr);
          }

          // Limpiar localStorage después de guardar exitosamente
          localStorage.removeItem('paymentPayload');
          localStorage.removeItem('paymentId');
          localStorage.removeItem('orderId');
          
          // Emitir evento personalizado para que otros componentes sepan que se completó el pago
          window.dispatchEvent(new CustomEvent('paymentCompleted', { detail: { orderId, paymentId } }));
        }
      } catch (err) {
        console.error('Error recording payment:', err);
      } finally {
        setLoading(false);
      }
    };

    recordPayment();
  }, [processed, token]);

  return (
    <IonPage>
      <Header />
      <IonContent className="success-content" fullscreen>
        <div className="success-wrapper">
          <div className="success-container">

            <IonIcon 
              icon={checkmarkCircleOutline} 
              className="success-icon"
            />

            <h1 className="success-title">
              Payment Completed Successfully!
            </h1>

            {loading ? (
              <p className="success-message">Updating payment status...</p>
            ) : (
              <>
                <p className="success-message">
                  Thank you for your purchase.
                </p>

                <p className="success-submessage">
                  Your product will be delivered shortly.
                  You will receive a confirmation email with all the details.
                </p>

                <IonButton 
                  expand="block"
                  className="success-button"
                  onClick={() => history.push('/home')}
                >
                  Back to Home
                </IonButton>
              </>
            )}

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Success;
