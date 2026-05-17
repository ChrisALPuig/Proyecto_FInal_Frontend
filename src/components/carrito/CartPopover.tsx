import { IonPopover, IonButton, IonIcon } from "@ionic/react";
import { close, add, remove } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useCart } from "../../contexts/useCart.tsx";
import { useAlert } from "../../contexts/AlertContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { API_ENDPOINTS } from "../../config/apiConfig";
import "./CartPopover.css";

interface CartPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: React.RefObject<HTMLDivElement | null>;
}

const CartPopover: React.FC<CartPopoverProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const { showErrorAlert, showLoginRequiredAlert } = useAlert();
  const { token, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const subtotal = getSubtotal();

  const generateOrderId = () => {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'ORDER-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleViewCart = () => {
    onClose();
    history.push("/carrito-juego");
  };

  const handleProceedPayment = async () => {
    if (cartItems.length === 0) {
      showErrorAlert(t('yourCartEmpty'));
      return;
    }

    if (!isAuthenticated || !token) {
      showLoginRequiredAlert();
      return;
    }

    const orderId = generateOrderId();

    try {
      // Calcular monto total del carrito
      const totalAmount = Number(subtotal.toFixed(2));
      
      // Crear nombre del producto (si es 1, el nombre; si son varios, indicar múltiples)
      const productName = cartItems.length === 1 ? cartItems[0].name : `${cartItems.length} items`;
      
      // Tomar la primera imagen para la tarjeta (o combinar)
      const gameImage = cartItems.length > 0 ? cartItems[0].image : null;

      const items = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price.toFixed(2)),
        quantity: item.quantity,
        image: item.image,
      }));

      // Crear UN SOLO Payment consolidado
      const payload = {
        orderId,
        productName,
        amount: totalAmount,
        gameImage,
        items,
      };

      const res = await fetch(`${API_ENDPOINTS.ORDERS}/continue-to-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status !== 'success') {
        showErrorAlert(`Error creando el pago: ${data.message || data.status}`);
        return;
      }

      // Guardar paymentId, orderId y payload completo en localStorage
      localStorage.setItem('paymentId', data.paymentId);
      localStorage.setItem('orderId', orderId);
      localStorage.setItem('paymentPayload', JSON.stringify(payload));

      // Cerrar el popover y redirigir a la página de pago
      onClose();
      history.push('/payment');
    } catch (err) {
      console.error('Error creando el pago:', err);
      showErrorAlert('Error creando el pago. Intenta nuevamente.');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (err: any) {
      const errorMessage = err?.message || 'Error al eliminar del carrito';
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (err: any) {
      const errorMessage = err?.message || 'Error al actualizar cantidad';
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  return (
    <IonPopover
      isOpen={isOpen}
      onDidDismiss={onClose}
      side="end"
      alignment="end"
      showBackdrop={true}
      translucent={false}
      className="cart-popover"
    >
      <div className="cart-popover-container">
        {/* Header */}
        <div className="cart-popover-header">
          <h2>{t("yourCart")}</h2>
          <button className="cart-popover-close" onClick={onClose}>
            <IonIcon icon={close} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-popover-items">
          {cartItems.length === 0 ? (
            <div className="cart-popover-empty">{t("yourCartEmpty")}</div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-popover-item">
                {/* Product Image */}
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Details */}
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3>{item.name}</h3>
                    <button
                      className="cart-item-remove"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <IonIcon icon={close} />
                    </button>
                  </div>

                  <p className="cart-item-price">€{item.price.toFixed(2)}</p>

                  {/* Quantity Selector */}
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <IonIcon icon={remove} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <IonIcon icon={add} />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="cart-item-total">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-popover-footer">
            <div className="cart-popover-subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">€{subtotal.toFixed(2)}</span>
            </div>
            <IonButton
              expand="block"
              color="light"
              className="cart-btn-secondary"
              onClick={handleViewCart}
            >
              {t("viewCart")}
            </IonButton>
            <IonButton
              expand="block"
              color="dark"
              className="cart-btn-primary"
              onClick={handleProceedPayment}
            >
              {t("proceedToPayment")}
            </IonButton>
          </div>
        )}
      </div>
    </IonPopover>
  );
};

export default CartPopover;