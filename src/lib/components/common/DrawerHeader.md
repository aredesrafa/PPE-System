# DrawerHeader Component

Componente reutilizável para headers de drawers do sistema DataLife EPI.

## Design Reference

- Figma: [Módulo EPI - Drawer Headers](https://www.figma.com/design/TwCLRJsnzdrmozHkVPHSid/M%C3%B3dulo-EPI?node-id=34-7100&t=VEat8YEcS8xUozDT-4)

## Uso Básico

```svelte
<script>
  import DrawerHeader from '$lib/components/common/DrawerHeader.svelte';
</script>

<!-- Exemplo simples -->
<DrawerHeader
  title="João Claudio"
  iconName="UserOutline"
  on:close={handleClose}
/>
```

## Props

### Obrigatórias

- **`title`** (string): Título principal do drawer

### Opcionais

- **`objectType`** (string): Texto em ALL CAPS no topo (ex: "FICHA EPI")
- **`iconName`** (string): Nome do ícone principal (default: "UserOutline")
- **`status`** (string): Status do objeto para exibir badge
- **`statusType`** ('ficha' | 'colaborador' | 'entrega' | 'item' | 'movimento'): Tipo do status para cores corretas
- **`additionalInfo`** (string[]): Array de informações adicionais (ex: CPF, empresa)
- **`primaryAction`** (object | null): Botão de ação primária
- **`secondaryAction`** (object | null): Botão de ação secundária
- **`tertiaryAction`** (object | null): Botão de ação terciária
- **`showMoreActions`** (boolean): Mostrar botão "..." de mais ações
- **`showCloseButton`** (boolean): Mostrar botão fechar (default: true)
- **`truncateTitle`** (boolean): Truncar título com "..." (default: true)

### Estrutura de Actions

```typescript
{
  text: string;
  icon?: string;
  disabled?: boolean;
}
```

## Eventos

- **`close`**: Disparado quando botão fechar é clicado
- **`primaryAction`**: Disparado quando botão primário é clicado
- **`secondaryAction`**: Disparado quando botão secundário é clicado
- **`tertiaryAction`**: Disparado quando botão terciário é clicado
- **`moreActions`**: Disparado quando botão "..." é clicado

## Variações

### 1. Header Completo (Template com todas as features)

```svelte
<DrawerHeader
  objectType="FICHA EPI"
  title="Drawer Title Header Text"
  iconName="ClipboardListOutline"
  status="ativo"
  statusType="ficha"
  additionalInfo={["CPF 123.456.789-00", "CLEANALLDAY SERVIÇOS DE LIMPEZA"]}
  primaryAction={{
    text: "Nova entrega",
    icon: "PlusOutline"
  }}
  secondaryAction={{
    text: "Secondary action"
  }}
  tertiaryAction={{
    text: "Cancelar"
  }}
  showMoreActions={true}
  on:close={handleClose}
  on:primaryAction={handlePrimaryAction}
  on:secondaryAction={handleSecondaryAction}
  on:tertiaryAction={handleTertiaryAction}
  on:moreActions={handleMoreActions}
/>
```

### 2. Header Sem Identificação do Objeto

```svelte
<DrawerHeader
  title="João Claudio"
  iconName="UserOutline"
  status="ativo"
  statusType="colaborador"
  additionalInfo={["CPF 123.456.789-00", "CLEANALLDAY SERVIÇOS DE LIMPEZA"]}
  primaryAction={{
    text: "Nova entrega",
    icon: "PlusOutline"
  }}
  on:close={handleClose}
  on:primaryAction={handleNovaEntrega}
/>
```

### 3. Header Simples

```svelte
<DrawerHeader
  title="João Claudio"
  iconName="UserOutline"
  status="ativo"
  statusType="colaborador"
  primaryAction={{
    text: "Nova entrega",
    icon: "PlusOutline"
  }}
  on:close={handleClose}
  on:primaryAction={handleNovaEntrega}
/>
```

### 4. Header Básico (Apenas Título)

```svelte
<DrawerHeader
  title="Nome do Colaborador"
  iconName="UserOutline"
  on:close={handleClose}
/>
```

## Ícones Comuns

- **Fichas**: `ClipboardListOutline`
- **Colaboradores**: `UserOutline`
- **EPIs**: `ShieldCheckOutline`
- **Estoque**: `CubeOutline`
- **Movimentações**: `TruckOutline`
- **Auditoria**: `DocumentTextOutline`

## Status Types

- **`ficha`**: Para fichas EPI (ativo, vencido, suspenso, arquivado)
- **`colaborador`**: Para colaboradores (ativo, inativo, desligado)
- **`entrega`**: Para entregas (assinado, nao_assinado, pendente)
- **`item`**: Para itens de estoque (disponivel, baixo_estoque, esgotado)
- **`movimento`**: Para movimentações (entrada, saida, ajuste)

## Comportamentos

### Truncamento de Título

- O título automaticamente trunca com "..." quando não couber
- Pode ser desabilitado com `truncateTitle={false}`

### Responsividade

- Elementos se adaptam ao espaço disponível
- Botões se reorganizam conforme necessário
- Informações adicionais quebram linha quando necessário

### Acessibilidade

- Botões têm estados focus e hover apropriados
- Suporte a navegação por teclado
- Labels adequados para screen readers

## Exemplos de Uso por Contexto

### Ficha EPI

```svelte
<DrawerHeader
  objectType="FICHA EPI"
  title={colaborador.nome}
  iconName="ClipboardListOutline"
  status={ficha.status}
  statusType="ficha"
  additionalInfo={[`CPF ${colaborador.cpf}`, colaborador.cargo]}
  primaryAction={{ text: "Nova entrega", icon: "PlusOutline" }}
  secondaryAction={{ text: "Editar" }}
  on:close={handleClose}
  on:primaryAction={handleNovaEntrega}
  on:secondaryAction={handleEditar}
/>
```

### Estoque

```svelte
<DrawerHeader
  objectType="ITEM ESTOQUE"
  title={tipoEPI.nomeEquipamento}
  iconName="CubeOutline"
  status={item.status}
  statusType="item"
  additionalInfo={[`Local: ${item.localizacao}`, `Lote: ${item.lote}`]}
  primaryAction={{ text: "Ajustar", icon: "AdjustmentsHorizontalOutline" }}
  on:close={handleClose}
  on:primaryAction={handleAjustar}
/>
```

### Colaborador

```svelte
<DrawerHeader
  title={colaborador.nome}
  iconName="UserOutline"
  status={colaborador.status}
  statusType="colaborador"
  additionalInfo={[`CPF ${colaborador.cpf}`, colaborador.empresa]}
  primaryAction={{ text: "Nova Ficha", icon: "PlusOutline" }}
  on:close={handleClose}
  on:primaryAction={handleNovaFicha}
/>
```
