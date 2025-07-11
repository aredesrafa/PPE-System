/**
 * Debug Utility for Delivery ID Issues
 * 
 * This utility helps identify and debug ID format issues in the delivery process
 */

import { 
  isValidUUID, 
  isValidEstoqueItemId, 
  isValidEntityId,
  normalizeId
} from './idValidation';

import { 
  mapToValidId,
  validateAndMapDeliveryPayload
} from './idMapper';

/**
 * Debug a single ID and show all validation results
 */
export function debugId(id: string, context: string = 'unknown'): void {
  console.group(`🔍 Debug ID: ${id} (${context})`);
  
  console.log('📋 Informações básicas:', {
    id: id,
    type: typeof id,
    length: id?.length,
    isEmpty: !id || id.trim() === ''
  });

  console.log('🔍 Validações:', {
    isUUID: isValidUUID(id),
    isEstoqueItemId: isValidEstoqueItemId(id),
    isEntityId: isValidEntityId(id, 'estoqueItem'),
    isValidForDefault: isValidEntityId(id, 'default')
  });

  console.log('🔄 Mapeamento:', mapToValidId(id, 'estoqueItem'));
  console.log('📝 Normalizado:', normalizeId(id));

  console.groupEnd();
}

/**
 * Debug um payload completo de entrega
 */
export function debugDeliveryPayload(payload: {
  fichaEpiId: string;
  responsavelId: string;
  itens: Array<{ estoqueItemId: string; quantidade: number }>;
}): void {
  console.group('🚚 Debug Delivery Payload');
  
  console.log('📋 Payload original:', payload);
  
  debugId(payload.fichaEpiId, 'fichaEpiId');
  debugId(payload.responsavelId, 'responsavelId');
  
  payload.itens.forEach((item, index) => {
    debugId(item.estoqueItemId, `itens[${index}].estoqueItemId`);
  });
  
  console.log('🔄 Resultado do mapeamento:', validateAndMapDeliveryPayload(payload));
  
  console.groupEnd();
}

/**
 * Gera exemplos de IDs válidos para teste
 */
export function generateValidIdExamples(): void {
  console.group('✅ Exemplos de IDs válidos');
  
  console.log('UUID válido:', '550e8400-e29b-41d4-a716-446655440000');
  console.log('Estoque Item ID válido:', 'I7XK91');
  console.log('Tipo EPI ID válido:', 'C2MN58');
  console.log('Entrega ID válido:', 'E4U302');
  
  console.groupEnd();
}

/**
 * Verifica se um array de IDs está válido
 */
export function validateIdArray(ids: string[], context: string = 'unknown'): boolean {
  console.group(`🔍 Validando array de IDs (${context})`);
  
  let allValid = true;
  
  ids.forEach((id, index) => {
    const isValid = isValidEntityId(id, 'estoqueItem');
    
    if (!isValid) {
      console.error(`❌ ID inválido na posição ${index}:`, id);
      allValid = false;
    } else {
      console.log(`✅ ID válido na posição ${index}:`, id);
    }
  });
  
  console.log(`📊 Resultado final: ${allValid ? 'Todos válidos' : 'Alguns inválidos'}`);
  console.groupEnd();
  
  return allValid;
}

/**
 * Função de teste para diferentes cenários de ID
 */
export function testIdScenarios(): void {
  console.group('🧪 Teste de Cenários de ID');
  
  // Cenário 1: IDs válidos
  console.log('📋 Cenário 1: IDs válidos');
  debugDeliveryPayload({
    fichaEpiId: '550e8400-e29b-41d4-a716-446655440000',
    responsavelId: '660e8400-e29b-41d4-a716-446655440001',
    itens: [
      { estoqueItemId: 'I7XK91', quantidade: 1 },
      { estoqueItemId: 'I2MN58', quantidade: 2 }
    ]
  });
  
  // Cenário 2: IDs inválidos (como os que estão causando erro)
  console.log('📋 Cenário 2: IDs inválidos');
  debugDeliveryPayload({
    fichaEpiId: 'FICHA009',
    responsavelId: 'USER123',
    itens: [
      { estoqueItemId: '15FF8D', quantidade: 1 }
    ]
  });
  
  // Cenário 3: IDs mistos
  console.log('📋 Cenário 3: IDs mistos');
  debugDeliveryPayload({
    fichaEpiId: '550e8400-e29b-41d4-a716-446655440000',
    responsavelId: 'USER123',
    itens: [
      { estoqueItemId: 'I7XK91', quantidade: 1 },
      { estoqueItemId: '15FF8D', quantidade: 1 }
    ]
  });
  
  console.groupEnd();
}

/**
 * Função para testar a validação no console do navegador
 */
export function runDeliveryIdTests(): void {
  console.clear();
  console.log('🚀 Iniciando testes de validação de IDs para entrega');
  
  generateValidIdExamples();
  testIdScenarios();
  
  console.log('✅ Testes concluídos');
}

// Exportar para uso global no console
if (typeof window !== 'undefined') {
  (window as any).debugDeliveryIds = {
    debugId,
    debugDeliveryPayload,
    generateValidIdExamples,
    validateIdArray,
    testIdScenarios,
    runDeliveryIdTests
  };
}