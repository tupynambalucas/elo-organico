import { type FC } from 'react';
import { useCart } from '../../hooks/useCart';
import styles from './styles.module.css';
import { Icon, faTimes, faTrash, faPlus, faMinus } from '@elo-organico/studio/icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const handleConfirmOrder = () => {
    // This will be implemented later
    alert('Compra confirmada! Iniciando processamento de pagamento...');
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`${styles.backdrop} ${isOpen === true ? styles.active : ''}`} 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen === true ? styles.open : ''}`}>
        <div className={styles.header}>
          <h3>Seu Carrinho</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Seu carrinho está vazio.</p>
              <span>Escolha produtos saudáveis e orgânicos para começar!</span>
            </div>
          ) : (
            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item._id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>R$ {Number(item.measure.value).toFixed(2)}</span>
                  </div>
                  
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item._id!, item.quantity - 1)}
                        className={styles.qtyBtn}
                      >
                        <Icon icon={faMinus} size="xs" />
                      </button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id!, item.quantity + 1)}
                        className={styles.qtyBtn}
                      >
                        <Icon icon={faPlus} size="xs" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item._id!)}
                      className={styles.removeBtn}
                    >
                      <Icon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Total Estimado</span>
              <span className={styles.totalAmount}>R$ {total.toFixed(2)}</span>
            </div>
            
            <button className={styles.confirmBtn} onClick={handleConfirmOrder}>
              Confirmar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
