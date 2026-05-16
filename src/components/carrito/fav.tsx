import { IonImg } from '@ionic/react';
import { useWishlist } from '../../contexts/useWishlist.ts';
import { useAlert } from '../../contexts/AlertContext.tsx';
import { useState } from 'react';

interface FavProps {
  itemId: string;
  itemName?: string;
  itemPrice?: number;
  itemImage?: string;
}

const ImagenToggle: React.FC<FavProps> = ({ itemId, itemName = '', itemPrice = 0, itemImage = '' }) => {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { showErrorAlert, showLoginRequiredAlert } = useAlert();
  const [optimistic, setOptimistic] = useState(false);

  const inWishlist = wishlistItems.some(item => item.id === itemId) || optimistic;

  const handleClick = async () => {
    try {
      if (inWishlist) {
        setOptimistic(false); // cambiamos visualmente el corazón inmediatamente
        await removeFromWishlist(itemId);
      } else {
        setOptimistic(true); // cambiamos visualmente el corazón inmediatamente
        await addToWishlist({
          id: itemId,
          name: itemName,
          price: itemPrice,
          image: itemImage,
        });
      }
    } catch (err: any) {
      console.error('Wishlist action failed', err);
      setOptimistic(false);
      const errorMessage = err?.message || 'No se pudo actualizar la wishlist.';
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  return (
    <IonImg
      src={inWishlist ? '/assets/images/Heart2.png' : '/assets/images/Heart.png'}
      alt="Favorito"
      onClick={handleClick}
      style={{ cursor: 'pointer', width: '30px', height: 'auto', transition: 'transform 0.25s ease' }}
      className="heart-icon"
    />
  );
};

export default ImagenToggle;