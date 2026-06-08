import { useEffect, useState, useMemo, Suspense, type FC } from 'react';
import { useCycleStore } from '@/domains/cycle';
import { useCart } from './hooks/useCart';
import styles from './styles.module.css';
import { Icon, faUser, faShoppingCart, faCalendarAlt } from '@elo-organico/studio/icons';
import { LogoHorizontalNegative } from '@elo-organico/studio/logos';
import { ProductSearchFilter } from '../admin/components';
import ProductCard from './components/Product/ProductCard';
import CartDrawer from './components/Cart/CartDrawer';
import UserDrawer from './components/User/UserDrawer';
import Loader from '@/components/loaders/ScreenLoader';
import type { ProductResponse } from '@elo-instance/core';

/**
 * Shop Feature Component
 * Single responsive version following SOLID principles.
 */
const Shop: FC = () => {
  const { activeCycle, fetchActiveCycle, isLoading: isCycleLoading } = useCycleStore();
  const { items: cartItems } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  useEffect(() => {
    void fetchActiveCycle();
  }, [fetchActiveCycle]);

  const handleFiltersChange = (search: string, type: string, category: string) => {
    setSearchTerm(search);
    setSelectedType(type);
    setSelectedCategory(category);
  };

  const filteredProducts = useMemo(() => {
    const cycleProducts = activeCycle?.products;
    if (cycleProducts === undefined) return [];
    
    return cycleProducts.filter((p) => {
      if (typeof p === 'string') return false; // Ensure product is populated
      
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || p.measure.type === selectedType;
      const matchesCategory = selectedCategory === '' || p.category === selectedCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    }) as ProductResponse[];
  }, [activeCycle?.products, searchTerm, selectedType, selectedCategory]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const closingDateFormatted = useMemo(() => {
    const closingDate = activeCycle?.closingDate;
    if (closingDate === undefined) return '';
    
    return new Date(closingDate).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [activeCycle?.closingDate]);

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.shopContainer}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <LogoHorizontalNegative className={styles.logoSvg} />
            </div>
            
            <div className={styles.actions}>
              <button 
                className={styles.iconButton} 
                onClick={() => setIsUserOpen(true)}
                title="Meu Perfil"
              >
                <Icon icon={faUser} size="lg" />
              </button>
              <button 
                className={styles.iconButton} 
                onClick={() => setIsCartOpen(true)}
                title="Carrinho"
              >
                <Icon icon={faShoppingCart} size="lg" />
                {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
              </button>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          {isCycleLoading === true ? (
            <div className={styles.loading}>Sincronizando com a colheita...</div>
          ) : activeCycle === null ? (
            <div className={styles.noResults}>
              <h3>Nenhum ciclo ativo no momento.</h3>
              <p>Fique atento às nossas redes para saber quando o próximo ciclo abrirá!</p>
            </div>
          ) : (
            <>
              <section className={styles.cycleInfo}>
                <div className={styles.cycleHeader}>
                  <h2 className={styles.cycleTitle}>{activeCycle.description}</h2>
                  <div className={styles.cycleBadge}>Ciclo Aberto</div>
                </div>
                <div className={styles.cycleDetails}>
                  <div className={styles.detailItem}>
                    <Icon icon={faCalendarAlt} size="sm" />
                    <span>Encerramento: <strong>{closingDateFormatted}</strong></span>
                  </div>
                </div>
              </section>

              <div className={styles.searchBar}>
                <ProductSearchFilter
                  searchTerm={searchTerm}
                  onSearchChange={(val) => handleFiltersChange(val, selectedType, selectedCategory)}
                  selectedType={selectedType}
                  onTypeChange={(type) => handleFiltersChange(searchTerm, type, selectedCategory)}
                  selectedCategory={selectedCategory}
                  onCategoryChange={(cat) => handleFiltersChange(searchTerm, selectedType, cat)}
                />
              </div>

              <div className={styles.productGrid}>
                {filteredProducts.length === 0 ? (
                  <div className={styles.noResults}>Nenhum produto encontrado com os filtros aplicados.</div>
                ) : (
                  filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </div>
            </>
          )}
        </main>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <UserDrawer isOpen={isUserOpen} onClose={() => setIsUserOpen(false)} />
      </div>
    </Suspense>
  );
};

export default Shop;
