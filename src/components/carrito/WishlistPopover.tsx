import { IonPopover, IonButton, IonIcon } from "@ionic/react";
import { close, cart } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useWishlist } from "../../contexts/useWishlist.ts";
import { useCart } from "../../contexts/useCart.tsx";
import { useAlert } from "../../contexts/AlertContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./WishlistPopover.css";

interface WishlistPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: React.RefObject<HTMLDivElement | null>;
}

const WishlistPopover: React.FC<WishlistPopoverProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showErrorAlert, showLoginRequiredAlert } = useAlert();
  const { t } = useLanguage();

 const handleRemove = async (itemId: string) => {
  try {
    await removeFromWishlist(itemId);
  } catch (err: any) {
    const errorMessage = err?.message || 'Error al eliminar de la wishlist';
    if (errorMessage.includes("iniciar sesión")) {
      showLoginRequiredAlert();
    } else {
      showErrorAlert(errorMessage);
    }
  }
};

const handleAddToCart = async (itemId: string) => {
  try {
    const item = wishlistItems.find(i => i.id === itemId);
    if (item) {
      await addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      await removeFromWishlist(itemId);
    }
  } catch (err: any) {
    const errorMessage = err?.message || 'Error al agregar al carrito';
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
      className="wishlist-popover"
    >
      <div className="wishlist-popover-container">
        {/* Header */}
        <div className="wishlist-popover-header">
          <h2>{t("wishlist")}</h2>
          <button className="wishlist-popover-close" onClick={onClose}>
            <IonIcon icon={close} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="wishlist-popover-items">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-popover-empty">
              <p>{t("wishlistEmpty")}</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-popover-item">
                {/* Product Image */}
                <div className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Details */}
                <div className="wishlist-item-details">
                  <div className="wishlist-item-header">
                    <h3>{item.name}</h3>
                    <button
                      className="wishlist-item-remove"
                      onClick={() => handleRemove(item.id)}
                      title="Remove from wishlist"
                    >
                      <IonIcon icon={close} />
                    </button>
                  </div>

                  <p className="wishlist-item-price">€{item.price.toFixed(2)}</p>

                  {/* Add to Cart Button */}
                  <button
                    className="wishlist-add-to-cart-btn"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <IonIcon icon={cart} />
                    {t("addToCart")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </IonPopover>
  );
};

export default WishlistPopover;
