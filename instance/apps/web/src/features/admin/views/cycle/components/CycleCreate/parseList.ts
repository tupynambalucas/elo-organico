import type { IProduct } from '@elo-instance/core';

export interface FailedLine {
  text: string;
  category: string;
}

export interface ParseResult {
  products: IProduct[];
  failedLines: FailedLine[];
  totalLinesProcessed: number;
}

const CATEGORY_NORMALIZATION: Record<string, string> = {
  'ALIMENTOS ORGÂNICOS': 'Hortifruti',
  HORTIFRUTI: 'Hortifruti',
  MERCEARIA: 'Mercearia',
  GELEIAS: 'Geleias e Doces',
  'GELEIAS SEM AÇÚCAR': 'Geleias e Doces',
  DOCES: 'Geleias e Doces',
  VINHOS: 'Bebidas e Vinhos',
  BEBIDAS: 'Bebidas e Vinhos',
  'VINHOS EM GARRAFAS': 'Bebidas e Vinhos',
};

const normalizeMeasureType = (unitString: string) => {
  if (unitString === '') return 'unidade';
  const type = unitString.toLowerCase().trim().replace('.', '');

  if (['pct', 'pcte', 'pacote'].includes(type)) return 'pacote';
  if (['uni', 'un', 'unidade'].includes(type)) return 'unidade';
  if (['l', 'litro', 'lt', 'garrafa', 'garrafas'].includes(type)) return 'litro';
  if (['garrafão', 'garrafao'].includes(type)) return 'garrafão';
  if (['kg', 'quilo', 'kilo'].includes(type)) return 'kg';
  if (['maço', 'maco'].includes(type)) return 'maço';
  if (['bandeja', 'bdj'].includes(type)) return 'bandeja';
  if (['pote', 'pt'].includes(type)) return 'pote';
  if (['saca'].includes(type)) return 'saca';
  if (['fardo'].includes(type)) return 'fardo';

  return type;
};

const normalizeContentUnit = (unit: string): 'g' | 'kg' | 'ml' | 'L' => {
  const u = unit.toLowerCase().trim().replace('.', '');
  if (['g', 'gr', 'gramas'].includes(u)) return 'g';
  if (['kg', 'quilo', 'kilo'].includes(u)) return 'kg';
  if (['ml'].includes(u)) return 'ml';
  if (['l', 'lt', 'litro', 'litros'].includes(u)) return 'L';
  return 'g';
};

const parsePrice = (priceStr: string): number => {
  return parseFloat(
    priceStr
      .replace(/[R$\s]/g, '')
      .replace(',', '.')
      .trim(),
  );
};

export const parseProductList = (text: string): ParseResult => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  const products: IProduct[] = [];
  const failedLines: FailedLine[] = [];

  let currentCategory = 'Hortifruti';
  let inheritedContent: { value: number; unit: 'g' | 'kg' | 'ml' | 'L' } | undefined = undefined;
  
  // Para lidar com listas de sabores (ex: Barra Cereais)
  let activeFlavorBase: Partial<IProduct> | null = null;

  const CONTENT_REGEX = /(?:^|\s|\()(\d+(?:[.,]\d+)?)\s*(g|gr|gramas|kg|quilo|kilo|ml|l|lt|litros?)(?:\s|\)|\/|$)/i;
  const PRICE_REGEX = /(?:[R$]\s*)?(\d+[.,]\d{2})\b(?:\s*ao\s*kg)?(?:\s*\/.*)?(?:\s*\(.*\))?$/i;
  const BULLET_REGEX = /^[\-*•]/;
  const MIN_ORDER_REGEX = /\/\s*(cx|saca|fardo)\s*([\d.,]+)\s*(kg|un|uni|unidade)?/i;
  const FLAVOR_HEADER_REGEX = /^(.*),\s*disponível nos seguintes sabores:$/i;

  for (const line of lines) {
    let cleanedLine = line.trim();

    // 1. Remover bullet e limpar negrito/itálico (Markdown)
    const hasBullet = BULLET_REGEX.test(cleanedLine);
    cleanedLine = cleanedLine.replace(/^[\-*•]\s*/, '').trim();
    cleanedLine = cleanedLine.replace(/^\*+|\*+$/g, '').trim(); // Remove **negrito**

    if (cleanedLine === '') continue;

    // 2. Detecção de Categorias / Cabeçalhos
    const upperLine = cleanedLine.toUpperCase();
    let isCategory = false;

    // Verificar normalização explícita
    for (const [key, value] of Object.entries(CATEGORY_NORMALIZATION)) {
      if (upperLine.includes(key)) {
        currentCategory = value;
        isCategory = true;
        activeFlavorBase = null; // Reseta contexto de sabores
        break;
      }
    }

    // Se for cabeçalho (sem preço e em caixa alta ou curto)
    if (isCategory === false && PRICE_REGEX.test(cleanedLine) === false) {
      const numbersCount = (cleanedLine.match(/\d/g) ?? []).length;
      if (numbersCount < 4 && cleanedLine.length < 50) {
        // Pode ser uma categoria nova ou sub-cabeçalho
        if (upperLine === cleanedLine || cleanedLine.endsWith(':') || cleanedLine.endsWith(';')) {
          currentCategory = cleanedLine.replace(/[;:]$/, '').trim();
          currentCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1).toLowerCase();
          
          // Tentar extrair conteúdo herdado (ex: Geleias 320g)
          const contentMatch = CONTENT_REGEX.exec(cleanedLine);
          if (contentMatch) {
            inheritedContent = {
              value: parseFloat(contentMatch[1].replace(',', '.')),
              unit: normalizeContentUnit(contentMatch[2]),
            };
          } else {
            inheritedContent = undefined;
          }
          
          isCategory = true;
          activeFlavorBase = null;
        }
      }
    }

    if (isCategory === true) continue;

    // 3. Detecção de Início de Sabores (ex: Barra Cereais)
    const flavorHeaderMatch = FLAVOR_HEADER_REGEX.exec(cleanedLine);
    if (flavorHeaderMatch) {
      const headerText = flavorHeaderMatch[1];
      const parsedHeader = parseLineData(headerText, currentCategory, undefined, CONTENT_REGEX, PRICE_REGEX, MIN_ORDER_REGEX);
      if (parsedHeader) {
        activeFlavorBase = parsedHeader;
        continue;
      }
    }

    // 4. Se temos um Flavor Base ativo e a linha começa com bullet, é um sabor
    if (activeFlavorBase !== null && hasBullet === true) {
      products.push({
        ...activeFlavorBase,
        name: `${activeFlavorBase.name} - ${cleanedLine}`,
      } as IProduct);
      continue;
    } else if (activeFlavorBase !== null) {
      // Se parou de vir bullet, cancela o modo de sabores
      activeFlavorBase = null;
    }

    // 5. Parsing normal de linha
    const product = parseLineData(cleanedLine, currentCategory, inheritedContent, CONTENT_REGEX, PRICE_REGEX, MIN_ORDER_REGEX);
    
    if (product) {
      products.push(product);
    } else if (hasBullet === true || PRICE_REGEX.test(cleanedLine)) {
      // Se falhou mas parece ser um produto
      failedLines.push({
        text: line.trim(),
        category: currentCategory,
      });
    }
  }

  return {
    products,
    failedLines,
    totalLinesProcessed: lines.length,
  };
};

/**
 * Função auxiliar para parsear dados de uma única linha
 */
function parseLineData(
  line: string, 
  category: string, 
  inheritedContent: { value: number; unit: 'g' | 'kg' | 'ml' | 'L' } | undefined,
  contentRegex: RegExp,
  priceRegex: RegExp,
  minOrderRegex: RegExp
): IProduct | null {
  const priceMatch = priceRegex.exec(line);
  if (!priceMatch) return null;

  const priceRaw = priceMatch[1];
  const priceValue = parsePrice(priceRaw);
  const fullMatchText = priceMatch[0];
  
  // Extrair info de pedido mínimo do que sobrou da linha ou do match do preço
  let extraInfo = line.substring(priceMatch.index + fullMatchText.length).trim();
  if (!extraInfo && priceMatch[0].includes('/')) {
    extraInfo = priceMatch[0].substring(priceMatch[0].indexOf('/')).trim();
  }

  let namePart = line.substring(0, priceMatch.index).trim();

  // Tentar extrair unidade de venda do final do nome (ex: "Alface americana uni")
  let saleUnit = 'unidade';
  const unitSuffixRegex = /\s(kg|un|uni|unidade|pct|pcte|pacote|maço|maco|bandeja|bdj|litro|l|lt|pote|pt|garrafa|garrafão|saca|fardo)\s*$/i;
  const unitMatch = unitSuffixRegex.exec(namePart);

  if (unitMatch) {
    saleUnit = normalizeMeasureType(unitMatch[1]);
    namePart = namePart.substring(0, unitMatch.index).trim();
  } else {
    // Heurísticas baseadas em palavras-chave no nome
    const lowerName = namePart.toLowerCase();
    if (lowerName.includes('garrafão')) saleUnit = 'garrafão';
    else if (lowerName.includes('vinho')) saleUnit = 'garrafa';
    else if (lowerName.includes('suco')) saleUnit = 'litro';
  }

  // Tentar extrair conteúdo (peso/volume)
  let contentData = inheritedContent;
  const contentMatch = contentRegex.exec(namePart);

  if (contentMatch) {
    const contentValue = parseFloat(contentMatch[1].replace(',', '.'));
    const contentUnitRaw = contentMatch[2];

    contentData = {
      value: contentValue,
      unit: normalizeContentUnit(contentUnitRaw),
    };

    // Remove o conteúdo do nome para não ficar duplicado
    namePart = namePart.replace(contentMatch[0], '').trim();
  }

  // Limpeza final do nome
  let finalName = namePart
    .replace(/[;.,-]$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Capitalize
  finalName = finalName.charAt(0).toUpperCase() + finalName.slice(1);

  // Pedido mínimo
  let minimumOrder = undefined;
  const minOrderMatch = minOrderRegex.exec(line); // Procura na linha inteira
  if (minOrderMatch) {
    // Se tiver uma unidade específica (kg, uni), usa ela. Caso contrário, usa o tipo do container (cx, saca).
    const type = (minOrderMatch[3] || minOrderMatch[1]).toLowerCase();
    minimumOrder = {
      type: normalizeMeasureType(type),
      value: parseFloat(minOrderMatch[2].replace(',', '.')),
    };
  }

  return {
    name: finalName,
    category: category,
    available: true,
    measure: {
      type: saleUnit,
      value: priceValue,
      minimumOrder,
    },
    content: contentData,
  };
}
