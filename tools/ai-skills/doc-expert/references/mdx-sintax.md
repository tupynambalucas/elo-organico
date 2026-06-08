# Sintaxe MDX (Markdown + JSX)

Referência técnica para o uso de componentes, expressões e lógica dentro de arquivos `.mdx` no monorepo **Elo Orgânico**.

## JSX (Componentes)

MDX permite o uso de componentes React (HTML ou customizados) intercalados com Markdown.

```mdx
import MyComponent from '@site/src/components/MyComponent';

# Título Markdown

<MyComponent title="Exemplo">
  Conteúdo **Markdown** dentro de um componente JSX.
</MyComponent>

<div className="custom-wrapper">
  Standard HTML também é suportado.
</div>
```

## Expressões (Chaves `{}`)

JavaScript pode ser executado dentro de chaves, similar ao JSX no React.

```mdx
export const year = new Date().getFullYear();

O ano atual é {year}.

{/* Cálculos e Lógica */}
Dois mais dois é {2 + 2}

{/* Manipulação de Strings */}
Olá {"Mundo".toUpperCase()}
```

## Imports (ESM)

Importe componentes, dados ou outros arquivos MDX. Deve estar no topo do arquivo ou separado por linhas em branco.

```mdx
import { Chart } from './components/Chart';
import data from './data.json';
import SharedContent from './shared.mdx';

<Chart data={data} />
<SharedContent />
```

## Exports

Defina variáveis, metadados ou layouts que podem ser usados localmente ou por quem importa o arquivo.

```mdx
export const metadata = {
  author: 'Elo Orgânico',
  category: 'Engineering'
};

# Autor: {metadata.author}

export const Layout = ({children}) => <div className="docs-layout">{children}</div>;
export default Layout;
```

## Comentários

Comentários HTML (`<!-- -->`) **não são suportados** no MDX. Use o padrão de comentários JavaScript dentro de expressões.

```mdx
{/* Este é um comentário válido no MDX */}

{/* 
  Comentário de 
  múltiplas linhas 
*/}
```

## Regras de Parsing e Diferenças

1.  **Markdown dentro de JSX:** Funciona se houver linhas em branco separando o Markdown das tags JSX em elementos de bloco (ex: `<div>`).
2.  **Caracteres Especiais:** Chaves `{` e sinais de menor `<` são interpretados como início de JSX/Expressão. Para exibi-los como texto, use escape: `\{` ou `\<`.
3.  **Indentação:** Evite indentar blocos JSX com 4 espaços ou Tab, pois isso pode disparar a formatação de bloco de código Markdown.

## Exemplo Completo (Padrão Elo Orgânico)

```mdx
import { Callout } from '@site/src/components/Callout';

export const status = "Active";

# Documentação Técnica

<Callout type="info">
  O status atual do sistema é: **{status === "Active" ? "Online" : "Offline"}**.
</Callout>

- [x] GFM suportado
- [x] JSX integrado
```
