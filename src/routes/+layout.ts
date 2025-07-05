/**
 * Layout Load Function - Inicialização Global da Aplicação
 * 
 * Carrega configurações globais e inicializa stores antes de renderizar qualquer página.
 * Garante que as configurações do backend estejam disponíveis em toda a aplicação.
 */

import { initializeConfiguration } from '$lib/stores/configurationStore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  try {
    console.log('🚀 Inicializando aplicação - carregando configurações globais...');
    
    // Inicializar configurações do sistema
    const configuration = await initializeConfiguration();
    
    console.log('✅ Configurações carregadas:', configuration);
    
    return {
      configuration
    };
    
  } catch (error) {
    console.error('❌ Erro ao carregar configurações:', error);
    
    // Em caso de erro, retornar configurações padrão para não quebrar a app
    return {
      configuration: {
        PERMITIR_ESTOQUE_NEGATIVO: false,
        PERMITIR_AJUSTES_FORCADOS: false,
        ESTOQUE_MINIMO_EQUIPAMENTO: 10,
        useV2Routes: false,
        enableAdvancedReports: true
      }
    };
  }
};