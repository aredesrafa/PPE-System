/**
 * Service Adapters Index
 * 
 * Exporta todos os service adapters especializados para uso em componentes.
 * Cada adapter implementa uma responsabilidade específica do domínio.
 */

// Core services
export { api, apiClient, ApiError, createUrlWithParams, errorUtils } from './core/apiClient';
export { configurationService, type BusinessConfiguration, type BusinessConfigurationItem } from './core/configurationService';

// Entity Management Adapter - Para entidades com hierarquia
export { entityManagementAdapter } from './entity/entityManagementAdapter';

// Inventory Command Adapter - Para Event Sourcing de estoque
export { inventoryCommandAdapter } from './inventory/inventoryCommandAdapter';

// Process Lifecycle Adapter - Para workflows complexos
export { processLifecycleAdapter } from './process/processLifecycleAdapter';

// Ficha Process Adapter - Para workflows de fichas EPI
export { fichaProcessAdapter } from './process/fichaProcessAdapter';

// Reporting Query Adapter - Para consultas especializadas
export { reportingQueryAdapter } from './reporting/reportingQueryAdapter';

// Business Configuration Stores
export { 
  businessConfigStore,
  tiposMovimentacaoStore,
  categoriasEPIStore,
  statusEntregaStore,
  statusFichaStore,
  statusEstoqueStore,
  tiposNotaStore,
  configReadyStore,
  tiposMovimentacaoOptions,
  categoriasEPIOptions,
  statusEntregaOptions,
  statusEstoqueOptions,
  initializeBusinessConfig,
  configToOptions
} from '../stores/businessConfigStore';

// Helper functions para facilitar importações  
export function getServiceAdapters() {
  return {
    entity: entityManagementAdapter,
    inventory: inventoryCommandAdapter,
    process: processLifecycleAdapter,
    ficha: fichaProcessAdapter,
    reporting: reportingQueryAdapter
  };
}

// Types
export type * from '../types/serviceTypes';

/**
 * Inicializa todos os services
 * Pode ser chamado no +layout.svelte para setup inicial
 */
export async function initializeServices(): Promise<void> {
  console.log('🚀 Inicializando service adapters...');
  
  try {
    // Configurações de negócio já são carregadas pelo businessConfigStore
    // Aqui podemos fazer outras inicializações se necessário
    
    console.log('✅ Service adapters inicializados com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar service adapters:', error);
  }
}

/**
 * Limpa cache de todos os services
 */
export function clearAllServiceCaches(): void {
  try {
    entityManagementAdapter.clearCache();
    inventoryCommandAdapter.clearCache();
    reportingQueryAdapter.clearCache();
    console.log('🗑️ Cache de todos os services limpo');
  } catch (error) {
    console.warn('⚠️ Erro ao limpar cache dos services:', error);
  }
}