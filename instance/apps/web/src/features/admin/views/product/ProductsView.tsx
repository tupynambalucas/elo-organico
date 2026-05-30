import { useEffect, useState, type FC } from 'react';
import { useProductStore } from '@/domains/product';
import styles from './styles.module.css';
import { Icon, faPen, faCarrot } from '@elo-organico/studio/icons';
import type { IProduct, ProductResponse } from '@elo-instance/core';
import { AdminContainer, ProductSearchFilter } from '../../components';

const ProductsView: FC = () => {
  const { products, fetchProducts, updateProduct, isLoading, isSubmitting } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IProduct>>({});

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const handleFiltersChange = (search: string, type: string, category: string) => {
    setSearchTerm(search);
    setSelectedType(type);
    setSelectedCategory(category);
    void fetchProducts({
      search: search !== '' ? search : undefined,
      type: type !== '' ? type : undefined,
      category: category !== '' ? category : undefined,
    });
  };

  const handleEditClick = (product: ProductResponse) => {
    if (product._id !== undefined) {
      setEditingId(product._id);
      setEditForm(JSON.parse(JSON.stringify(product)) as Partial<IProduct>);
    }
  };

  const handleSaveInlineEdit = async () => {
    if (editingId !== null && editForm.name !== undefined && editForm.name !== '') {
      const success = await updateProduct(editingId, editForm);
      if (success === true) {
        setEditingId(null);
      }
    }
  };

  const handleCancelInlineEdit = () => {
    setEditingId(null);
  };

  return (
    <AdminContainer title="Central de Produtos" icon={faCarrot}>
      <div className={styles.filters}>
        <ProductSearchFilter
          searchTerm={searchTerm}
          onSearchChange={(val) => handleFiltersChange(val, selectedType, selectedCategory)}
          selectedType={selectedType}
          onTypeChange={(type) => handleFiltersChange(searchTerm, type, selectedCategory)}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => handleFiltersChange(searchTerm, selectedType, cat)}
        />
      </div>

      <div className={styles.productsList}>
        {isLoading === true ? (
          <div className={styles.loading}>Carregando produtos...</div>
        ) : (
          products.map((p) => (
            editingId === p._id ? (
              <div key={`edit-${p._id ?? 'new'}`} className={styles.editInlineContainer}>
                <div className={styles.fixGrid}>
                  <div className={styles.fixField} style={{ flex: '2 1 200px' }}>
                    <label>Nome do Produto</label>
                    <input
                      className={styles.fixInput}
                      value={editForm.name ?? ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nome..."
                    />
                  </div>
                  <div className={styles.fixField} style={{ flex: '1 1 80px' }}>
                    <label>Preço (R$)</label>
                    <input
                      className={styles.fixInput}
                      value={editForm.measure?.value ?? ''}
                      onChange={(e) => setEditForm(prev => ({ 
                        ...prev, 
                        measure: { 
                          type: prev.measure?.type ?? 'unidade',
                          value: Number(e.target.value),
                          minimumOrder: prev.measure?.minimumOrder
                        } 
                      }))}
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className={styles.fixField} style={{ flex: '1 1 100px' }}>
                    <label>Unidade</label>
                    <select
                      className={styles.fixInput}
                      value={editForm.measure?.type ?? 'unidade'}
                      onChange={(e) => setEditForm(prev => ({ 
                        ...prev, 
                        measure: { 
                          type: e.target.value,
                          value: prev.measure?.value ?? 0,
                          minimumOrder: prev.measure?.minimumOrder
                        } 
                      }))}
                    >
                      <option value="unidade">Unidade</option>
                      <option value="pacote">Pacote</option>
                      <option value="kg">Kg</option>
                      <option value="litro">Litro</option>
                      <option value="maço">Maço</option>
                      <option value="bandeja">Bandeja</option>
                      <option value="garrafão">Garrafão</option>
                      <option value="pote">Pote</option>
                      <option value="saca">Saca</option>
                      <option value="fardo">Fardo</option>
                    </select>
                  </div>
                  <div className={styles.fixField} style={{ flex: '1 1 120px' }}>
                    <label>Peso/Vol (Opcional)</label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input
                        className={styles.fixInput}
                        value={editForm.content?.value ?? ''}
                        onChange={(e) => setEditForm(prev => ({
                          ...prev,
                          content: { 
                            unit: prev.content?.unit ?? 'g',
                            value: e.target.value !== '' ? Number(e.target.value) : 0 
                          }
                        }))}
                        placeholder="Ex: 500"
                        type="number"
                      />
                      <select
                        className={styles.fixInput}
                        value={editForm.content?.unit ?? 'g'}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          content: { 
                            unit: e.target.value as 'g' | 'kg' | 'ml' | 'L',
                            value: prev.content?.value ?? 0 
                          } 
                        }))}
                        style={{ width: '60px', padding: '0.4rem' }}
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles.editActions}>
                  <button type="button" className={styles.cancelInlineBtn} onClick={handleCancelInlineEdit} disabled={isSubmitting}>
                    Cancelar
                  </button>
                  <button type="button" className={styles.saveInlineBtn} onClick={() => void handleSaveInlineEdit()} disabled={isSubmitting}>
                    {isSubmitting === true ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </div>
            ) : (
              <div key={p._id} className={styles.productRow}>
                <div className={styles.pInfo}>
                  <strong>{p.name}</strong>
                  <div className={styles.pSubInfo}>
                    <span className={styles.categoryTag}>{p.category}</span>
                    {p.content !== null && p.content !== undefined && (
                      <span className={styles.contentBadge}>{p.content.value}{p.content.unit}</span>
                    )}
                  </div>
                </div>
                <div className={styles.pMeta}>
                  <div className={styles.priceContainer}>
                    <span className={styles.unitBadge}>{p.measure.type}</span>
                    <span className={styles.price}>R$ {Number(p.measure.value).toFixed(2)}</span>
                  </div>
                  <div className={styles.pActions}>
                    <button type="button" className={styles.iconBtn} onClick={() => handleEditClick(p)} title="Editar" disabled={isSubmitting}>
                      <Icon icon={faPen} />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </AdminContainer>
  );
}

export default ProductsView;
