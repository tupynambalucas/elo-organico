import { useState, useCallback, useEffect } from 'react';
import { useAdminCycleStore } from '../../../../domains/cycle/cycle.store';
import { useCyclesNavigation } from '../../cycle.navigation';
import { parseProductList, type FailedLine } from './parseList';
import type { FixingItem } from './types';
import type { IProduct } from '@elo-instance/core';

export const useCycleCreate = () => {
  const { currentStep, setStep, resetNavigation } = useCyclesNavigation();
  const { createCycle, isSubmitting, error: storeError } = useAdminCycleStore();

  // --- Estado Local ---
  const [textInput, setTextInput] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [failedLines, setFailedLines] = useState<FailedLine[]>([]);

  // Estado para correção em massa
  const [fixingItems, setFixingItems] = useState<FixingItem[]>([]);
  const [isFixingErrors, setIsFixingErrors] = useState(false);

  const [openingDate, setOpeningDate] = useState<Date | null>(new Date());
  const [closingDate, setClosingDate] = useState<Date | null>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });

  useEffect(() => {
    return () => resetNavigation();
  }, [resetNavigation]);

  const handleReset = useCallback(() => {
    setTextInput('');
    setDescription('');
    setProducts([]);
    setFailedLines([]);
    setFixingItems([]);
    setIsFixingErrors(false);
    resetNavigation();
  }, [resetNavigation]);

  const handleParse = useCallback(() => {
    const { products: parsedProducts, failedLines: failures } = parseProductList(textInput);
    setProducts(parsedProducts);
    setFailedLines(failures);

    // Se houver falhas, não entra em modo de correção automático,
    // apenas mostra o ValidateStep com o alerta, igual ao original.
    setStep('validate-list');
    setIsFixingErrors(false);
  }, [textInput, setStep]);

  // Lógica original: converte TODAS as falhas em itens editáveis de uma vez
  const handleStartFixing = useCallback(() => {
    const PRICE_REGEX = /(?:[R$]\s*)?(\d+[.,]?\d*)\b/i;
    const CONTENT_REGEX = /(\d+(?:[.,]\d+)?)\s*(g|gr|kg|ml|l|lt|litros?)/i;
    const UNIT_SUFFIX_REGEX = /\s(kg|un|uni|unidade|pct|pcte|pacote|maço|maco|bandeja|bdj|litro|l|lt|pote|pt|garrafa|garrafão|saca|fardo)\s*$/i;
    const MIN_ORDER_REGEX = /\/\s*(cx|saca|fardo)\s*([\d.,]+)\s*(kg|un|uni|unidade)?/i;

    const itemsToFix = failedLines.map((fail, idx) => {
      const cleanText = fail.text.replace(/[\-*•]/g, '').replace(/^\*+|\*+$/g, '').trim();
      let estimatedName = cleanText;
      let estimatedPrice = '';
      let estimatedUnit = 'unidade';
      let estimatedContentValue = '';
      let estimatedContentUnit = 'g';
      let estimatedMinOrderType = '';
      let estimatedMinOrderValue = '';

      const priceMatch = PRICE_REGEX.exec(cleanText);
      if (priceMatch) {
        estimatedPrice = priceMatch[1].replace(',', '.');
        estimatedName = cleanText.substring(0, priceMatch.index).trim();
      }

      const unitMatch = UNIT_SUFFIX_REGEX.exec(estimatedName);
      if (unitMatch) {
        estimatedUnit = unitMatch[1].toLowerCase();
        estimatedName = estimatedName.substring(0, unitMatch.index).trim();
      }

      const contentMatch = CONTENT_REGEX.exec(estimatedName);
      if (contentMatch) {
        estimatedContentValue = contentMatch[1].replace(',', '.');
        estimatedContentUnit = contentMatch[2].toLowerCase();
        estimatedName = estimatedName.replace(contentMatch[0], '').trim();
      }

      const minOrderMatch = MIN_ORDER_REGEX.exec(cleanText);
      if (minOrderMatch) {
        estimatedMinOrderType = (minOrderMatch[3] || minOrderMatch[1]).toLowerCase();
        estimatedMinOrderValue = minOrderMatch[2].replace(',', '.');
      }

      return {
        id: `fix-${idx}-${fail.text.length}`,
        originalText: fail.text,
        category: fail.category || '',
        name: estimatedName,
        price: estimatedPrice,
        unit: estimatedUnit,
        contentValue: estimatedContentValue,
        contentUnit: estimatedContentUnit,
        minOrderType: estimatedMinOrderType,
        minOrderValue: estimatedMinOrderValue,
      };
    });

    setFixingItems(itemsToFix);
    setIsFixingErrors(true);
  }, [failedLines]);

  const handleUpdateFixingItem = useCallback(
    (id: string, field: keyof FixingItem, value: string) => {
      setFixingItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      );
    },
    [],
  );

  // Processa todos os itens corrigidos
  const handleProcessFixedItems = useCallback(() => {
    const stillInvalid: FixingItem[] = [];
    const validNewProducts: IProduct[] = [];

    fixingItems.forEach((item) => {
      const priceNum = parseFloat(item.price.replace(',', '.'));
      const contentValNum = item.contentValue !== undefined && item.contentValue !== '' ? parseFloat(item.contentValue.replace(',', '.')) : NaN;
      const minOrderValNum = item.minOrderValue !== undefined && item.minOrderValue !== '' ? parseFloat(item.minOrderValue.replace(',', '.')) : NaN;

      if (item.name.trim().length > 2 && !isNaN(priceNum) && priceNum > 0) {
        let contentData = undefined;
        if (!isNaN(contentValNum)) {
          let unit: 'g' | 'kg' | 'ml' | 'L' = 'g';
          const u = (item.contentUnit ?? 'g').toLowerCase();
          if (['g', 'gr'].includes(u)) unit = 'g';
          else if (['kg'].includes(u)) unit = 'kg';
          else if (['ml'].includes(u)) unit = 'ml';
          else if (['l', 'lt', 'litro'].includes(u)) unit = 'L';

          contentData = { value: contentValNum, unit };
        }

        let minimumOrder = undefined;
        if (item.minOrderType !== undefined && item.minOrderType !== '' && !isNaN(minOrderValNum)) {
          minimumOrder = {
            type: item.minOrderType,
            value: minOrderValNum,
          };
        }

        validNewProducts.push({
          name: item.name.trim(),
          category: item.category,
          available: true,
          measure: {
            type: item.unit,
            value: priceNum,
            minimumOrder,
          },
          content: contentData,
        });
      } else {
        stillInvalid.push(item);
      }
    });

    if (validNewProducts.length > 0) {
      setProducts((prev) => [...prev, ...validNewProducts]);
    }

    setFixingItems(stillInvalid);

    if (stillInvalid.length === 0) {
      setIsFixingErrors(false);
      setFailedLines([]); // Limpa as falhas pois foram todas resolvidas
    } else {
      // Opcional: Feedback visual de que ainda faltam itens
      // alert(`Atenção: ${stillInvalid.length} itens ainda estão incorretos.`);
    }
  }, [fixingItems]);

  const handleRemoveProduct = useCallback((indexToRemove: number) => {
    setProducts((prev) => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!openingDate || !closingDate) return;

    const finalDescription = description.trim()
      ? description
      : `Ciclo de ${openingDate.toLocaleDateString()}`;

    const success = await createCycle({
      description: finalDescription,
      openingDate,
      closingDate,
      products,
    });

    if (success) {
      handleReset();
    }
  }, [createCycle, openingDate, closingDate, products, description, handleReset]);

  return {
    state: {
      step: currentStep,
      textInput,
      description,
      products,
      failedLines,
      fixingItems, // Array
      openingDate,
      closingDate,
      isSubmitting,
      storeError,
      isFixingErrors,
    },
    actions: {
      setStep,
      setTextInput,
      setDescription,
      setOpeningDate,
      setClosingDate,
      handleParse,
      handleStartFixing,
      handleUpdateFixingItem,
      handleProcessFixedItems,
      handleRemoveProduct,
      handleSubmit,
      handleReset,
    },
  };
};
