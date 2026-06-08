import { type FC } from 'react';
import type { IProduct } from '@elo-instance/core';
import { useCart } from '../../hooks/useCart';
import styles from './styles.module.css';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        {/* Real images would go here */}
        <div className={styles.tagsContainer}>
          <span className={styles.category}>{product.category}</span>
          {product.measure.label !== undefined && (
            <span className={styles.labelTag}>{product.measure.label}</span>
          )}
        </div>
      </div>
      
      <div className={styles.info}>
        <h4 className={styles.name}>{product.name}</h4>
        
        <div className={styles.details}>
          <span className={styles.measure}>
            {product.measure.type}
            {product.content !== null && product.content !== undefined && (
              <> • {product.content.value}{product.content.unit}</>
            )}
          </span>
          <span className={styles.price}>
            R$ {Number(product.measure.value).toFixed(2)}
          </span>
        </div>
        
        <button className={styles.addBtn} onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
