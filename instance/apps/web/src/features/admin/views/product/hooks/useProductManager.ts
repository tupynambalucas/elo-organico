import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/domains/product';
import type { IProduct, ProductResponse } from '@elo-instance/core';

export const useProductManager = () => {
  const { products, fetchProducts, updateProduct, isLoading, isSubmitting } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IProduct>>({});

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const handleFiltersChange = useCallback((search: string, type: string, category: string) => {
    setSearchTerm(search);
    setSelectedType(type);
    setSelectedCategory(category);
    void fetchProducts({
      search: search !== '' ? search : undefined,
      type: type !== '' ? type : undefined,
      category: category !== '' ? category : undefined,
    });
  }, [fetchProducts]);

  const handleEditClick = useCallback((product: ProductResponse) => {
    if (product._id !== undefined) {
      setEditingId(product._id);
      setEditForm(JSON.parse(JSON.stringify(product)) as Partial<IProduct>);
    }
  }, []);

  const handleSaveInlineEdit = useCallback(async () => {
    if (editingId !== null && editForm.name !== undefined && editForm.name !== '') {
      const success = await updateProduct(editingId, editForm);
      if (success === true) {
        setEditingId(null);
      }
    }
  }, [editingId, editForm, updateProduct]);

  const handleCancelInlineEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const handleUpdateEditForm = useCallback((updates: Partial<IProduct>) => {
    setEditForm(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    state: {
      products,
      isLoading,
      isSubmitting,
      searchTerm,
      selectedType,
      selectedCategory,
      editingId,
      editForm,
    },
    actions: {
      handleFiltersChange,
      handleEditClick,
      handleSaveInlineEdit,
      handleCancelInlineEdit,
      handleUpdateEditForm,
    },
  };
};
