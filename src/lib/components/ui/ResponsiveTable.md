# ResponsiveTable Component

Componente de tabela responsiva que evita scroll horizontal em telas >= 980px através de técnicas de responsividade inteligente.

## Estratégias de Responsividade

### 1. **Colunas Ocultas (Breakpoint-based)**

Oculta colunas menos importantes em telas menores:

```svelte
<TableHeadCell class="hidden lg:table-cell">Cargo</TableHeadCell>
<TableHeadCell class="hidden xl:table-cell">Data Emissão</TableHeadCell>
```

### 2. **Larguras Mínimas Controladas**

Define largura mínima para evitar compressão excessiva:

```svelte
<TableHeadCell class="min-w-[200px]">Colaborador</TableHeadCell>
<TableHeadCell class="min-w-[120px]">Cargo</TableHeadCell>
```

### 3. **Informações Consolidadas**

Mostra dados ocultos dentro de células visíveis:

```svelte
<TableBodyCell class="min-w-[200px]">
  <div>
    <p class="font-medium">Nome Principal</p>
    <p class="text-sm text-gray-500">Info Secundária</p>
    <!-- Mostrar cargo em mobile quando coluna cargo está oculta -->
    <p class="text-xs text-gray-500 lg:hidden mt-1">
      {cargo}
    </p>
  </div>
</TableBodyCell>
```

### 4. **Truncamento Inteligente**

Aplica truncamento apenas onde necessário:

```svelte
<p class="font-medium truncate">
  {nomeColaborador}
</p>
```

## Breakpoints Utilizados

### Tailwind CSS Breakpoints:

- **`sm`**: 640px+
- **`md`**: 768px+
- **`lg`**: 1024px+ (ponto principal)
- **`xl`**: 1280px+
- **`2xl`**: 1536px+

### Estratégia por Tela:

#### **Mobile (< 1024px)**

- Mostrar apenas colunas essenciais
- Consolidar informações em células principais
- Usar badges menores e simplificados

#### **Tablet (1024px - 1279px)**

- Mostrar colunas principais + algumas secundárias
- Manter informações consolidadas
- Usar tamanhos padrão

#### **Desktop (1280px+)**

- Mostrar todas as colunas
- Layout completo
- Máximo de informações visíveis

## Padrões de Implementação

### 1. **Coluna Principal (Sempre Visível)**

```svelte
<TableHeadCell class="min-w-[200px]">Colaborador</TableHeadCell>
<TableBodyCell class="min-w-[200px]">
  <div>
    <p class="font-medium text-gray-900 dark:text-white truncate">
      {colaborador.nome}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      CPF: {colaborador.cpf}
    </p>
    <!-- Info de colunas ocultas -->
    <p class="text-xs text-gray-500 dark:text-gray-400 lg:hidden mt-1">
      {colaborador.cargo}
    </p>
  </div>
</TableBodyCell>
```

### 2. **Coluna Secundária (Desktop/Tablet)**

```svelte
<TableHeadCell class="min-w-[120px] hidden lg:table-cell">Cargo</TableHeadCell>
<TableBodyCell class="min-w-[120px] hidden lg:table-cell">
  <span class="text-sm text-gray-900 dark:text-white">
    {colaborador.cargo}
  </span>
</TableBodyCell>
```

### 3. **Coluna Terciária (Apenas Desktop)**

```svelte
<TableHeadCell class="min-w-[110px] hidden xl:table-cell">Data Emissão</TableHeadCell>
<TableBodyCell class="min-w-[110px] hidden xl:table-cell">
  <span class="text-sm text-gray-900 dark:text-white">
    {formatarData(data)}
  </span>
</TableBodyCell>
```

### 4. **Coluna de Ações (Sempre Visível)**

```svelte
<TableHeadCell class="min-w-[120px]">Ações</TableHeadCell>
<TableBodyCell class="min-w-[120px]">
  <div class="flex space-x-2">
    <!-- Botões principais -->
    <button>...</button>

    <!-- Info móvel de colunas ocultas -->
    <div class="lg:hidden flex items-center">
      <Badge class="text-xs">{count}</Badge>
    </div>
  </div>
</TableBodyCell>
```

## Larguras Recomendadas

### Por Tipo de Conteúdo:

- **Nome/Título**: `min-w-[200px]`
- **Cargo/Função**: `min-w-[120px]`
- **Data**: `min-w-[110px]`
- **Status/Badge**: `min-w-[100px]`
- **Número/Count**: `min-w-[80px]`
- **Ações**: `min-w-[120px]`

### Cálculo Total:

```
Essenciais: 200 + 140 + 100 + 120 = 560px
+ Secundárias: 120 + 80 = 200px
+ Terciárias: 110px
= Total: 870px (< 980px ✓)
```

## Aplicação em Outras Tabelas

### 1. **Estoque**

```svelte
<!-- Colunas essenciais: Item, Quantidade, Localização, Ações -->
<TableHeadCell class="min-w-[200px]">Item</TableHeadCell>
<TableHeadCell class="min-w-[100px]">Quantidade</TableHeadCell>
<TableHeadCell class="min-w-[120px] hidden lg:table-cell">Localização</TableHeadCell>
<TableHeadCell class="min-w-[140px]">Validade</TableHeadCell>
<TableHeadCell class="min-w-[120px]">Ações</TableHeadCell>
```

### 2. **Movimentações**

```svelte
<!-- Colunas essenciais: Tipo, Item, Quantidade, Data, Ações -->
<TableHeadCell class="min-w-[100px]">Tipo</TableHeadCell>
<TableHeadCell class="min-w-[180px]">Item</TableHeadCell>
<TableHeadCell class="min-w-[100px]">Quantidade</TableHeadCell>
<TableHeadCell class="min-w-[120px] hidden lg:table-cell">Responsável</TableHeadCell>
<TableHeadCell class="min-w-[110px]">Data</TableHeadCell>
<TableHeadCell class="min-w-[120px]">Ações</TableHeadCell>
```

### 3. **Colaboradores**

```svelte
<!-- Colunas essenciais: Nome, Status, Empresa, Ações -->
<TableHeadCell class="min-w-[200px]">Colaborador</TableHeadCell>
<TableHeadCell class="min-w-[120px] hidden lg:table-cell">Cargo</TableHeadCell>
<TableHeadCell class="min-w-[140px] hidden xl:table-cell">Empresa</TableHeadCell>
<TableHeadCell class="min-w-[100px]">Status</TableHeadCell>
<TableHeadCell class="min-w-[120px]">Ações</TableHeadCell>
```

## Boas Práticas

### ✅ **Fazer**

- Definir `min-w-[]` em todas as colunas
- Usar `hidden lg:table-cell` para colunas secundárias
- Consolidar informações em células principais
- Manter ações sempre visíveis
- Usar `truncate` em textos longos

### ❌ **Evitar**

- Larguras fixas (`w-[]`) em vez de mínimas
- Ocultar colunas de ações
- Scroll horizontal em telas > 980px
- Quebrar informações essenciais
- Classes responsivas inconsistentes

## CSS Classes Principais

```css
/* Container */
.min-w-[980px] - Define largura mínima antes do scroll
.overflow-x-auto - Ativa scroll horizontal quando necessário

/* Colunas */
.min-w-[Xpx] - Largura mínima da coluna
.hidden lg:table-cell - Oculta até lg, mostra como table-cell
.truncate - Trunca texto com "..."

/* Texto responsivo */
.lg:hidden - Oculta em lg+
.xl:hidden - Oculta em xl+
```

## Resultado

✅ **Sem scroll horizontal** em telas >= 980px
✅ **Informações preservadas** através de consolidação
✅ **UX consistente** em todos os dispositivos
✅ **Padrão reutilizável** para todo o sistema
