<script lang="ts">
  import { Badge } from 'flowbite-svelte';
  import { getFlowbiteColor } from '$lib/theme';
  import { 
    EPI_STATUS, 
    EMPLOYEE_STATUS, 
    STOCK_STATUS 
  } from '$lib/constants/content';
  
  export let status: string;
  export let type: 'ficha' | 'colaborador' | 'empresa' | 'estoque' | 'entrega' | 'item' | 'generic' = 'generic';
  export let size: 'xs' | 'sm' = 'sm';
  
  // Mapeamento semântico de status usando constantes centralizadas
  const statusConfig = {
    ficha: {
      'ativo': { status: 'ativo', text: EPI_STATUS.active },
      'vencido': { status: 'vencido', text: EPI_STATUS.expired },
      'suspenso': { status: 'suspenso', text: EPI_STATUS.suspended },
      'arquivado': { status: 'arquivado', text: EPI_STATUS.archived }
    },
    colaborador: {
      'ativo': { status: 'ativo', text: EMPLOYEE_STATUS.active },
      'afastado': { status: 'afastado', text: EMPLOYEE_STATUS.away },
      'desligado': { status: 'desligado', text: EMPLOYEE_STATUS.dismissed }
    },
    empresa: {
      'ativa': { status: 'ativo', text: 'Ativa' },
      'inativa': { status: 'inativo', text: 'Inativa' }
    },
    estoque: {
      'disponivel': { status: 'disponivel', text: STOCK_STATUS.available },
      'baixo_estoque': { status: 'baixo_estoque', text: STOCK_STATUS.lowStock },
      'vencido': { status: 'vencido', text: STOCK_STATUS.expired },
      'esgotado': { status: 'esgotado', text: STOCK_STATUS.outOfStock }
    },
    entrega: {
      'nao_assinado': { status: 'nao_assinado', text: 'Não Assinado' },
      'assinado': { status: 'assinado', text: 'Assinado' },
      'pendente': { status: 'pendente', text: 'Pendente' }
    },
    item: {
      'entregue': { status: 'ativo', text: 'Entregue' },
      'devolvido': { status: 'inativo', text: 'Devolvido' },
      'vencido': { status: 'vencido', text: 'Vencido' },
      'com_colaborador': { status: 'ativo', text: 'Com Colaborador' }
    },
    generic: {}
  };
  
  // Configuração padrão para status não mapeados
  const defaultConfig = { status: status, text: status };
  
  $: config = (statusConfig[type] as any)?.[status] || defaultConfig;
  $: badgeColor = getFlowbiteColor(config.status);
  $: displayText = config?.text || status;
</script>

<Badge color={badgeColor === 'gray' ? 'none' : badgeColor} {size} class="w-fit rounded-sm">
  {displayText}
</Badge>