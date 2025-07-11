/**
 * ID Mapper Utilities
 * 
 * Handles mapping between different ID formats during transition period
 * from legacy display IDs to proper database IDs (UUID or custom format)
 */

import { 
  isValidUUID, 
  isValidEstoqueItemId, 
  isValidTipoEPIId, 
  normalizeId 
} from './idValidation';

export interface IdMappingResult {
  originalId: string;
  mappedId: string;
  format: 'uuid' | 'custom' | 'legacy' | 'unknown';
  isValid: boolean;
  needsMapping: boolean;
}

/**
 * Maps a potentially legacy ID to a valid backend ID
 * This is a temporary solution while backend transitions to consistent ID formats
 */
export function mapToValidId(id: string, context: 'fichaEpi' | 'responsavel' | 'estoqueItem' = 'estoqueItem'): IdMappingResult {
  if (!id || typeof id !== 'string') {
    return {
      originalId: id,
      mappedId: id,
      format: 'unknown',
      isValid: false,
      needsMapping: false
    };
  }

  const trimmedId = id.trim();

  // If already in valid format, return as-is
  if (isValidUUID(trimmedId)) {
    return {
      originalId: id,
      mappedId: normalizeId(trimmedId),
      format: 'uuid',
      isValid: true,
      needsMapping: false
    };
  }

  // Check if it's a valid custom ID
  if (context === 'estoqueItem' && isValidEstoqueItemId(trimmedId)) {
    return {
      originalId: id,
      mappedId: normalizeId(trimmedId),
      format: 'custom',
      isValid: true,
      needsMapping: false
    };
  }

  // Handle legacy formats - this is where we'd implement specific mappings
  // For now, we'll try to extract valid patterns or create placeholder UUIDs
  
  // Pattern 1: "FICHA009" - extract number and create a mapping
  const fichaMatch = trimmedId.match(/^FICHA(\d+)$/i);
  if (fichaMatch && context === 'fichaEpi') {
    // For now, we'll have to pass the original ID and let the backend handle it
    // In a real scenario, this would query a mapping table
    return {
      originalId: id,
      mappedId: trimmedId, // Keep original for now
      format: 'legacy',
      isValid: false, // Not valid for direct backend use
      needsMapping: true
    };
  }

  // Pattern 2: Short hex-like IDs like "15FF8D"
  const hexMatch = trimmedId.match(/^[0-9A-F]{4,8}$/i);
  if (hexMatch && context === 'estoqueItem') {
    // Try to pad to 6 characters for custom ID format
    const paddedId = trimmedId.toUpperCase().padStart(6, '0');
    if (paddedId.length === 6) {
      // Try to create a valid custom ID by prefixing with 'I'
      const customId = `I${paddedId.substring(1)}`;
      if (isValidEstoqueItemId(customId)) {
        return {
          originalId: id,
          mappedId: customId,
          format: 'custom',
          isValid: true,
          needsMapping: true
        };
      }
    }
    
    return {
      originalId: id,
      mappedId: trimmedId,
      format: 'legacy',
      isValid: false,
      needsMapping: true
    };
  }

  // If we can't map it, return as-is but mark as needing mapping
  return {
    originalId: id,
    mappedId: trimmedId,
    format: 'legacy',
    isValid: false,
    needsMapping: true
  };
}

/**
 * Maps multiple IDs in batch
 */
export function mapIdBatch(ids: string[], context: 'fichaEpi' | 'responsavel' | 'estoqueItem' = 'estoqueItem'): IdMappingResult[] {
  return ids.map(id => mapToValidId(id, context));
}

/**
 * Validates and maps a delivery payload to ensure all IDs are in the correct format
 */
export function validateAndMapDeliveryPayload(payload: {
  fichaEpiId: string;
  responsavelId: string;
  itens: Array<{ estoqueItemId: string; quantidade: number }>;
}): {
  isValid: boolean;
  mappedPayload?: any;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Map fichaEpiId
  const fichaMapping = mapToValidId(payload.fichaEpiId, 'fichaEpi');
  if (!fichaMapping.isValid && fichaMapping.needsMapping) {
    warnings.push(`fichaEpiId "${payload.fichaEpiId}" está em formato legado e pode causar erros`);
  }

  // Map responsavelId
  const responsavelMapping = mapToValidId(payload.responsavelId, 'responsavel');
  if (!responsavelMapping.isValid && responsavelMapping.needsMapping) {
    warnings.push(`responsavelId "${payload.responsavelId}" está em formato legado e pode causar erros`);
  }

  // Map estoque item IDs
  const itemMappings = payload.itens.map((item, index) => {
    const mapping = mapToValidId(item.estoqueItemId, 'estoqueItem');
    if (!mapping.isValid && mapping.needsMapping) {
      warnings.push(`itens[${index}].estoqueItemId "${item.estoqueItemId}" está em formato legado e pode causar erros`);
    }
    return {
      estoqueItemId: mapping.mappedId,
      quantidade: item.quantidade,
      mapping
    };
  });

  // Check if we have any unmappable IDs
  const unmappableItems = itemMappings.filter(item => !item.mapping.isValid);
  if (unmappableItems.length > 0) {
    errors.push(`IDs de estoque não podem ser mapeados: ${unmappableItems.map(item => item.estoqueItemId).join(', ')}`);
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      warnings
    };
  }

  return {
    isValid: true,
    mappedPayload: {
      fichaEpiId: fichaMapping.mappedId,
      responsavelId: responsavelMapping.mappedId,
      itens: itemMappings.map(item => ({
        estoqueItemId: item.estoqueItemId,
        quantidade: item.quantidade
      }))
    },
    errors: [],
    warnings
  };
}

/**
 * Temporary fallback: Generate a placeholder UUID for testing
 * This should NOT be used in production
 */
export function generatePlaceholderUUID(seed: string): string {
  // Simple deterministic UUID generation for testing
  // In production, this should query the database for proper mapping
  const hash = seed.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const hex = Math.abs(hash).toString(16).padStart(8, '0').substring(0, 8);
  return `${hex.substring(0, 8)}-0000-0000-0000-${hex.substring(0, 4)}${hex.substring(0, 8)}`;
}

/**
 * Log ID mapping issues for debugging
 */
export function logIdMappingIssues(results: IdMappingResult[], context: string): void {
  const needsMapping = results.filter(r => r.needsMapping);
  const invalid = results.filter(r => !r.isValid);
  
  if (needsMapping.length > 0) {
    console.warn(`⚠️ ${context}: ${needsMapping.length} IDs precisam de mapeamento:`, 
      needsMapping.map(r => ({ original: r.originalId, mapped: r.mappedId, format: r.format }))
    );
  }
  
  if (invalid.length > 0) {
    console.error(`❌ ${context}: ${invalid.length} IDs inválidos:`, 
      invalid.map(r => ({ original: r.originalId, format: r.format }))
    );
  }
}