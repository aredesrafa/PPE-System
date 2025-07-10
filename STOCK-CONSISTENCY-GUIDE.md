# 🔧 Guia de Correção de Inconsistências de Estoque

## 📋 **Problema Identificado**

O "Avental de Raspa de Couro CA 32890" apresentava uma inconsistência crítica:
- **Estoque atual**: 244 unidades
- **Saldo do kardex**: -2 unidades
- **Diferença**: 246 unidades

### **Causa Raiz**
Scripts de seed que inserem dados diretamente no **Read Model** (tabela de estoque) sem gerar eventos correspondentes no **Event Log** (kardex), causando desincronização em arquiteturas CQRS/Event Sourcing.

---

## 🛠️ **Solução Implementada**

### **1. Sistema de Detecção Automática**

#### **Arquivo**: `src/lib/utils/stockConsistencyFixer.ts`
- ✅ Compara estoque atual vs saldo do kardex para todos os itens
- ✅ Classifica inconsistências por severidade (crítica, alta, média, baixa)
- ✅ Identifica tipo (Read Model maior vs Event Log maior)
- ✅ Gera recomendações de correção

#### **Funcionalidades**:
```typescript
// Detectar todas as inconsistências
const inconsistencies = await stockConsistencyFixer.detectInconsistencies();

// Corrigir automaticamente
const results = await stockConsistencyFixer.fixAllInconsistencies(inconsistencies);

// Gerar relatório
const report = stockConsistencyFixer.generateReport(inconsistencies);
```

### **2. Script CLI para Linha de Comando**

#### **Arquivo**: `scripts/check-stock-consistency.ts`

#### **Comandos Disponíveis**:
```bash
# Apenas verificar inconsistências
npm run check-stock

# Verificar e corrigir automaticamente
npm run check-stock:fix

# Verificar item específico (ex: avental)
npm run check-stock:avental

# Com logs detalhados
npm run check-stock --verbose

# Ajuda completa
npm run check-stock --help
```

### **3. Interface Visual de Administração**

#### **Página**: `/admin`
- ✅ Interface web para verificação e correção
- ✅ Visualização em tempo real das inconsistências
- ✅ Correção automática ou individual
- ✅ Histórico de correções aplicadas
- ✅ Relatórios estatísticos

---

## 🎯 **Como Usar**

### **Método 1: Interface Web (Recomendado)**

1. **Acesse**: `http://localhost:5177/admin`
2. **Clique**: "Verificar" para detectar inconsistências
3. **Analise**: Resultados por severidade e tipo
4. **Corrija**: 
   - Individual: Botão "Corrigir" em cada item
   - Em massa: "Corrigir Automaticamente"

### **Método 2: Linha de Comando**

```bash
# Para o caso específico do Avental de Raspa
npm run check-stock:avental

# Para verificação completa do sistema
npm run check-stock

# Para correção automática (cuidado!)
npm run check-stock:fix
```

### **Método 3: Programaticamente**

```typescript
import { runFullConsistencyCheck } from '$lib/utils/stockConsistencyFixer';

// Verificação completa
const result = await runFullConsistencyCheck(false);
console.log(result.report);

// Com correção automática
const resultWithFix = await runFullConsistencyCheck(true);
```

---

## ⚙️ **Endpoint de Correção**

### **POST `/api/estoque/ajuste-direto`**

O sistema usa o endpoint oficial do backend para aplicar correções:

```json
{
  "almoxarifadoId": "uuid-do-almoxarifado",
  "tipoEpiId": "uuid-do-tipo-epi", 
  "novaQuantidade": 244,
  "motivo": "Correção de estoque inicial - importação de dados seed",
  "validarPermissao": true
}
```

**Vantagens**:
- ✅ Gera evento correto no Event Log
- ✅ Mantém rastreabilidade completa
- ✅ Sincroniza Read Model e Event Log
- ✅ Preserva auditoria

---

## 🚨 **Classificação de Severidade**

### **Crítica** 🔴
- Estoque zerado mas kardex com movimentações
- Diferença ≥ 100% do estoque atual
- **Ação**: Correção manual recomendada

### **Alta** 🟠
- Diferença entre 50-99% do estoque atual
- **Ação**: Revisar antes de corrigir automaticamente

### **Média** 🟡
- Diferença entre 20-49% do estoque atual
- **Ação**: Correção automática segura

### **Baixa** 🔵
- Diferença < 20% do estoque atual
- **Ação**: Correção automática recomendada

---

## 🔍 **Tipos de Inconsistência**

### **Read Model Maior** 🟣
- Estoque atual > Saldo kardex
- **Causa comum**: Importação de dados sem eventos
- **Exemplo**: Estoque 244, Kardex -2

### **Event Log Maior** 🟦  
- Saldo kardex > Estoque atual
- **Causa comum**: Eventos não processados na projeção
- **Exemplo**: Estoque 10, Kardex 15

---

## 📊 **Relatório de Exemplo**

```
🚨 RELATÓRIO DE INCONSISTÊNCIAS DE ESTOQUE
==========================================
Total: 3 inconsistências
- Críticas: 1
- Altas: 1
- Médias: 1
- Baixas: 0

DETALHES:
----------
🔸 Avental de Raspa de Couro
   CA: 32890
   Estoque Atual: 244
   Saldo Kardex: -2
   Diferença: 246
   Severidade: CRÍTICA
   Recomendação: Aplicar ajuste de -246 unidades

🔸 Capacete de Segurança
   CA: 12345
   Estoque Atual: 50
   Saldo Kardex: 25
   Diferença: 25
   Severidade: ALTA
   Recomendação: Aplicar ajuste de -25 unidades
```

---

## ⚠️ **Precauções Importantes**

### **1. Backup Sempre**
```bash
# Sempre faça backup antes de correções
pg_dump datalife_epi > backup_$(date +%Y%m%d_%H%M%S).sql
```

### **2. Teste em Desenvolvimento**
```bash
# Execute primeiro em ambiente de desenvolvimento
npm run check-stock --verbose
```

### **3. Correções Críticas**
- ❌ **NUNCA** corrija inconsistências críticas automaticamente
- ✅ **SEMPRE** analise manualmente inconsistências críticas
- ✅ **VERIFIQUE** se há processos paralelos rodando

### **4. Monitoramento**
```bash
# Execute verificação regularmente
# Adicione ao cron para execução diária
0 6 * * * cd /path/to/project && npm run check-stock
```

---

## 🎯 **Casos de Uso Específicos**

### **Correção do Avental de Raspa**
```bash
# 1. Verificar o item específico
npm run check-stock:avental

# 2. Se confirmar inconsistência, corrigir via interface web
# Acesse /admin → Verificar → Corrigir item específico

# 3. Ou corrigir via API diretamente:
curl -X POST https://epi-backend-s14g.onrender.com/api/estoque/ajuste-direto \
  -H "Content-Type: application/json" \
  -d '{
    "almoxarifadoId": "uuid-almoxarifado",
    "tipoEpiId": "uuid-avental",
    "novaQuantidade": -2,
    "motivo": "Correção: seed importado sem eventos, kardex indica -2",
    "validarPermissao": true
  }'
```

### **Limpeza Pós-Seed**
```bash
# Após executar seeds, sempre verificar consistência
npm run seed:run
npm run check-stock:fix  # Cuidado: apenas não-críticas
```

### **Auditoria Mensal**
```bash
# Verificação completa mensal
npm run check-stock > relatorio_$(date +%Y%m).txt
```

---

## 🚀 **Status da Implementação**

### ✅ **Implementado**
- [x] Sistema de detecção automática
- [x] Classificação por severidade
- [x] Script CLI completo
- [x] Interface web administrativa
- [x] Integração com endpoint de correção
- [x] Logs detalhados e rastreabilidade
- [x] Correção individual e em massa
- [x] Relatórios estatísticos

### 🔄 **Próximas Melhorias**
- [ ] Alertas automáticos por email
- [ ] Dashboard de monitoramento
- [ ] Integração com CI/CD
- [ ] Métricas históricas
- [ ] API REST para integração externa

---

## 📞 **Suporte**

Para dúvidas ou problemas:
1. **Verificar logs**: Console do navegador ou terminal
2. **Consultar documentação**: `API-P0719h.md`
3. **Executar diagnóstico**: `npm run check-stock --verbose`

**Comandos de debug úteis**:
```bash
# Verificar conectividade com backend
curl https://epi-backend-s14g.onrender.com/health

# Testar endpoint de kardex específico
curl "https://epi-backend-s14g.onrender.com/api/estoque/kardex/{almoxarifadoId}/{tipoEpiId}"

# Logs detalhados do sistema
npm run check-stock --verbose > debug.log 2>&1
```

---

**✅ Sistema pronto para corrigir a inconsistência do "Avental de Raspa de Couro CA 32890" e prevenir problemas futuros!**