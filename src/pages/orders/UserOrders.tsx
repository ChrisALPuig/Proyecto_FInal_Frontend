import { IonContent, IonPage, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../config/apiConfig';
import Header from '../../components/Header/Header.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import './UserOrders.css';

interface PaymentItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Payment {
  id: number;
  paymentId: string;
  productName: string;
  orderId: string;
  amount: number | string;
  status: string;
  createdAt: string;
  gameImage?: string;
  items?: string;
}

const UserOrders: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null);
  const { token } = useAuth();
  const { t } = useLanguage();

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const downloadGame = async (orderId: string, gameName: string) => {
    try {
      setDownloadingOrderId(orderId);
      const response = await fetch(`${API_ENDPOINTS.DOWNLOADS}/game/${orderId}`);
      
      if (!response.ok) {
        alert('Error downloading file');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${gameName.replaceAll(/[^a-zA-Z0-9._-]/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading game:', error);
      alert('Error downloading file');
    } finally {
      setDownloadingOrderId(null);
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.PAYMENTS}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          console.error('Failed to fetch payments');
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPayments();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <div className="user-orders-container">
          <h1>My Orders & Payments</h1>
          {loading ? (
            <p>Loading...</p>
          ) : payments.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="orders-list">
              {payments.map((payment) => {
                let paymentItems: PaymentItem[] = [];
                if (payment.items) {
                  try {
                    paymentItems = JSON.parse(payment.items);
                  } catch (error) {
                    console.error('Error parsing payment items:', error);
                  }
                }

                return (
                  <div key={payment.id} className="order-card">
                    <div className="order-card-content">
                      <div className="order-image-wrapper">
                        {payment.gameImage ? (
                          <img src={payment.gameImage} alt={payment.productName} className="order-image" />
                        ) : (
                          <div className="order-image-placeholder">{payment.productName?.charAt(0).toUpperCase() || 'O'}</div>
                        )}
                      </div>
                      <div className="order-info">
                        <div className="order-header">
                          <div className="order-header-left">
                            <p className="order-date">{new Date(payment.createdAt).toLocaleDateString()}</p>
                            <IonText className="order-id">{payment.productName}</IonText>
                            <button className="toggle-details-btn toggle-details-btn-small" onClick={() => toggleOrderDetails(payment.id)}>
                              {expandedOrders[payment.id] ? t('hideDetails') : t('showDetails')}
                            </button>
                          </div>
                          <IonText className={`order-status ${payment.status}`}>
                            {payment.status}
                          </IonText>
                        </div>
                        <div className="order-details">
                          <p><strong>{t('orderIdLabel')}</strong> {payment.orderId}</p>
                          <p><strong>{t('createdAtLabel')}</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                          <p><strong>{t('amountLabel')}</strong> €{Number(payment.amount).toFixed(2)}</p>
                          <p><strong>{t('statusLabel')}</strong> {payment.status}</p>
                          {payment.status === 'success' && (
                            <button 
                              className="download-game-btn"
                              onClick={() => downloadGame(payment.orderId, payment.productName)}
                              disabled={downloadingOrderId === payment.orderId}
                            >
                              {downloadingOrderId === payment.orderId ? 'Downloading...' : 'Download Game'}
                            </button>
                          )}
                        </div>
                        {expandedOrders[payment.id] && (
                          <div className="order-items">
                            <h4>{t('orderItemsTitle')}</h4>
                            {paymentItems.length > 0 ? (
                              paymentItems.map((item) => (
                                <div key={item.id} className="order-item-row">
                                  <img src={item.image} alt={item.name} className="order-item-image" />
                                  <div className="order-item-info">
                                    <p className="order-item-name">{item.name}</p>
                                    <p className="order-item-qty">{t('orderItemsQuantity').replace('{count}', item.quantity.toString())}</p>
                                  </div>
                                  <p className="order-item-price">€{Number(item.price).toFixed(2)}</p>
                                </div>
                              ))
                            ) : (
                              <p className="order-item-empty">{t('orderItemsEmpty')}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserOrders;