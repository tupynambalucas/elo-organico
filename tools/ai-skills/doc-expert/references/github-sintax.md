# Sintaxe GFM (GitHub Flavored Markdown)

Referência técnica de escrita e formatação para o monorepo **Elo Orgânico**.

## Títulos

```markdown
# Título Nível 1
## Título Nível 2
### Título Nível 3
#### Título Nível 4
##### Título Nível 5
###### Título Nível 6
```

## Formatação de Texto

| Estilo | Sintaxe | Exemplo |
| :--- | :--- | :--- |
| **Negrito** | `**texto**` ou `__texto__` | `**Negrito**` |
| *Itálico* | `*texto*` ou `_texto_` | `_Itálico_` |
| ~~Tachado~~ | `~~texto~~` | `~~Tachado~~` |
| **_Negrito e Itálico_** | `**_texto_**` | `**_Combinado_**` |
| Subscrito | `<sub>texto</sub>` | `H<sub>2</sub>O` |
| Sobrescrito | `<sup>texto</sup>` | `X<sup>2</sup>` |
| Sublinhado | `<ins>texto</ins>` | `<ins>Sublinhado</ins>` |

## Citações (Blockquotes)

```markdown
> Este é uma citação de nível 1.
>> Este é uma citação aninhada de nível 2.
```

## Código

### Código em linha (Inline)
```markdown
Use `git status` para listar arquivos modificados.
```

### Blocos de Código (Fenced Code Blocks)
````markdown
```typescript
const elo = "orgânico";
console.log(elo);
```
````

## Cores (Suportado em Issues/PRs)

```markdown
O background é `#ffffff` (Hex).
Cores RGB: `rgb(9, 105, 218)`
Cores HSL: `hsl(212, 92%, 45%)`
```

## Links e Âncoras

### Links Externos e Internos
```markdown
[Texto do Link](https://pages.github.com/)
[Link Relativo](docs/CONTRIBUTING.md)
[Link para Âncora](#títulos)
```

### Âncoras Personalizadas
```markdown
<a name="minha-ancora"></a>
[Ir para âncora](#minha-ancora)
```

## Imagens

```markdown
![Texto Alt](https://link-da-imagem.png)
![Imagem Relativa](/assets/images/logo.png)
```

## Listas

### Não Ordenadas
```markdown
- Item A
- Item B
  - Sub-item B1
```

### Ordenadas
```markdown
1. Primeiro item
2. Segundo item
```

### Listas de Tarefas (Checklists)
```markdown
- [x] Tarefa concluída
- [ ] Tarefa pendente
```

## Alertas (Admonitions)

```markdown
> [!NOTE]
> Informação útil que o usuário deve saber.

> [!TIP]
> Conselhos úteis para fazer as coisas melhor.

> [!IMPORTANT]
> Informação crucial para atingir o objetivo.

> [!WARNING]
> Informação urgente que requer atenção imediata.

> [!CAUTION]
> Alerta sobre riscos ou consequências negativas.
```

## Menções e Referências

```markdown
Mencionar usuário: @username
Mencionar equipe: @org/team-name
Referenciar Issue/PR: #123
```

## Emojis

```markdown
:+1: :shipit: :tada: :rocket:
```

## Notas de Rodapé

```markdown
Aqui está uma nota[^1].

[^1]: Referência da nota de rodapé.
```

## Comentários e Escape

### Ocultar conteúdo
```markdown
<!-- Este conteúdo não será renderizado -->
```

### Escapar caracteres Markdown
```markdown
\*Este texto não será itálico\*
```

## Quebras de Linha

Para forçar uma quebra de linha em arquivos `.md`:
- Use dois espaços ao final da linha.  
- Use uma barra invertida `\` ao final da linha.
- Use a tag `<br/>`.
