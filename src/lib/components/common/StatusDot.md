# StatusDot Component

Componente de status com círculo colorido seguido de texto, baseado no design "Dot & Text" do Figma.

## Design Reference
- Figma: [Módulo EPI - Dot & Text Component](https://www.figma.com/design/TwCLRJsnzdrmozHkVPHSid/M%C3%B3dulo-EPI?node-id=34-8521&t=1Usw09822EBWTcSf-4)

## Uso Básico

```svelte
<script>
  import StatusDot from '$lib/components/common/StatusDot.svelte';
</script>

<!-- Exemplo básico -->
<StatusDot status="ativo" type="ficha" />
```

## Props

### Obrigatórias
- **`status`** (string): Status do objeto (ex: "ativo", "vencido", "suspenso")
- **`type`** ('ficha' | 'colaborador' | 'entrega' | 'item' | 'movimento'): Tipo do objeto para cores corretas

### Opcionais
- **`showText`** (boolean): Mostrar texto ao lado do dot (default: true)
- **`size`** ('sm' | 'md' | 'lg'): Tamanho do dot e texto (default: 'md')

## Tamanhos

### Dot Sizes
- **`sm`**: 8px (w-2 h-2) + text-xs (12px)
- **`md`**: 10px (w-2.5 h-2.5) + text-sm (14px) - **Padrão Figma**
- **`lg`**: 12px (w-3 h-3) + text-base (16px)

## Status e Cores

### Fichas EPI
```svelte
<StatusDot status="ativo" type="ficha" />      <!-- Verde: #00B8AA -->
<StatusDot status="vencido" type="ficha" />    <!-- Vermelho: #FF4563 -->
<StatusDot status="suspenso" type="ficha" />   <!-- Amarelo: #D98C29 -->
<StatusDot status="arquivado" type="ficha" />  <!-- Cinza: #535D72 -->
```

### Colaboradores
```svelte
<StatusDot status="ativo" type="colaborador" />     <!-- Verde: #00B8AA -->
<StatusDot status="inativo" type="colaborador" />   <!-- Cinza: #535D72 -->
<StatusDot status="desligado" type="colaborador" /> <!-- Vermelho: #FF4563 -->
<StatusDot status="suspenso" type="colaborador" />  <!-- Amarelo: #D98C29 -->
```

### Entregas
```svelte
<StatusDot status="assinado" type="entrega" />     <!-- Verde: #00B8AA -->
<StatusDot status="nao_assinado" type="entrega" /> <!-- Amarelo: #D98C29 -->
<StatusDot status="pendente" type="entrega" />     <!-- Amarelo: #D98C29 -->
<StatusDot status="cancelado" type="entrega" />    <!-- Vermelho: #FF4563 -->
```

### Itens de Estoque
```svelte
<StatusDot status="disponivel" type="item" />     <!-- Verde: #00B8AA -->
<StatusDot status="baixo_estoque" type="item" />  <!-- Amarelo: #D98C29 -->
<StatusDot status="esgotado" type="item" />       <!-- Vermelho: #FF4563 -->
<StatusDot status="vencendo" type="item" />       <!-- Amarelo: #D98C29 -->
```

### Movimentações
```svelte
<StatusDot status="entrada" type="movimento" />        <!-- Verde: #00B8AA -->
<StatusDot status="saida" type="movimento" />          <!-- Vermelho: #FF4563 -->
<StatusDot status="ajuste" type="movimento" />         <!-- Azul: #3F83F8 -->
<StatusDot status="transferencia" type="movimento" />  <!-- Azul: #3F83F8 -->
```

## Variações

### 1. Status Completo (Padrão)
```svelte
<StatusDot status="ativo" type="ficha" />
<!-- Resultado: 🟢 Ativo -->
```

### 2. Apenas Dot (Sem Texto)
```svelte
<StatusDot status="vencido" type="ficha" showText={false} />
<!-- Resultado: 🔴 -->
```

### 3. Tamanhos Diferentes
```svelte
<StatusDot status="ativo" type="ficha" size="sm" />   <!-- Pequeno -->
<StatusDot status="ativo" type="ficha" size="md" />   <!-- Médio (padrão) -->
<StatusDot status="ativo" type="ficha" size="lg" />   <!-- Grande -->
```

### 4. Em Headers de Drawer
```svelte
<DrawerHeader
  title="João Silva"
  status="ativo"
  statusType="colaborador"
  ...
/>
<!-- Status aparece automaticamente como StatusDot -->
```

## Exemplos de Uso por Contexto

### Em Headers
```svelte
<!-- Header de ficha -->
<div class="flex items-center gap-3">
  <h2>João Silva</h2>
  <StatusDot status="ativo" type="colaborador" />
</div>
```

### Em Cards/Listas
```svelte
<!-- Card de colaborador -->
<div class="card">
  <h3>Maria Santos</h3>
  <StatusDot status="suspenso" type="colaborador" size="sm" />
</div>
```

### Em Tabelas
```svelte
<!-- Célula de tabela -->
<td>
  <StatusDot status="vencido" type="ficha" size="sm" />
</td>
```

### Indicadores Visuais
```svelte
<!-- Lista com apenas dots -->
<ul>
  <li class="flex items-center gap-2">
    <StatusDot status="ativo" type="item" showText={false} />
    Capacete de Segurança
  </li>
  <li class="flex items-center gap-2">
    <StatusDot status="baixo_estoque" type="item" showText={false} />
    Luvas de Proteção
  </li>
</ul>
```

## Paleta de Cores Utilizada

### Sistema de Cores Semânticas
- **Verde (#00B8AA)**: Estados positivos (ativo, disponível, assinado, entrada)
- **Vermelho (#FF4563)**: Estados negativos (vencido, esgotado, desligado, saída)
- **Amarelo (#D98C29)**: Estados de atenção (suspenso, baixo_estoque, pendente)
- **Cinza (#535D72)**: Estados neutros (arquivado, inativo)
- **Azul (#3F83F8)**: Estados informativos (ajuste, transferência)

### Consistência Visual
- Cores seguem a paleta personalizada do DataLife EPI
- Mesmo sistema de cores usado em toda aplicação
- Fallback para cinza quando status não encontrado

## Acessibilidade

### Boas Práticas
- Texto legível em ambos os temas (claro/escuro)
- Contraste adequado entre dot e fundo
- Borda sutil no dot para definição
- Tamanhos apropriados para diferentes contextos

### Suporte a Temas
```css
/* Light theme */
color: #0F1736; /* text-gray-900 */
border: 1px solid #FFFFFF; /* border-white */

/* Dark theme */
color: #FFFFFF; /* dark:text-white */
border: 1px solid #1F2937; /* dark:border-gray-800 */
```

## Migração do StatusIndicator

### Antes (Badge)
```svelte
<StatusIndicator status="ativo" type="ficha" />
<!-- Resultado: [Ativo] badge -->
```

### Depois (Dot + Text)
```svelte
<StatusDot status="ativo" type="ficha" />
<!-- Resultado: 🟢 Ativo -->
```

### Vantagens
- **Visual mais limpo**: Dot é menos intrusivo que badge
- **Melhor hierarquia**: Não compete com conteúdo principal
- **Consistência**: Segue padrão do Figma
- **Flexibilidade**: Pode usar apenas dot ou dot + texto
- **Performance**: Menos CSS, mais eficiente

## Personalização

### Classes CSS Customizadas
```svelte
<StatusDot 
  status="ativo" 
  type="ficha" 
  class="custom-spacing"
/>
```

### Estilos Inline (não recomendado)
```svelte
<!-- Use apenas em casos muito específicos -->
<StatusDot 
  status="ativo" 
  type="ficha"
  style="gap: 0.5rem;"
/>
```