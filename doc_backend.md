
  🔗 URLs de Conexão

  API Principal

  https://epi-backend-s14g.onrender.com

  Endpoints Específicos

  Base URL: https://epi-backend-s14g.onrender.com/api
  Health Check: https://epi-backend-s14g.onrender.com/health
  Documentação: https://epi-backend-s14g.onrender.com/api/docs

  🔧 Configuração no Frontend

  Variáveis de Ambiente (.env)

  REACT_APP_API_URL=https://epi-backend-s14g.onrender.com/api
  REACT_APP_HEALTH_URL=https://epi-backend-s14g.onrender.com/health

  Headers CORS

  O backend já está configurado para aceitar requisições de:
  - https://epi-frontend.onrender.com
  - Localhost (desenvolvimento)

  ⚠️ Considerações Importantes

  1. HTTPS Obrigatório: Todas as requisições devem usar HTTPS
  2. Cold Start: Primeiro acesso pode demorar 30-60s (free tier)
  3. Rate Limits: Free tier tem limitações de CPU/memória
  4. Cache: Redis configurado para otimizar performance

  🔍 Teste de Conectividade

  curl https://epi-backend-s14g.onrender.com/health

  Retorna:
  {
    "status": "ok",
    "timestamp": "2025-07-05T...",
    "service": "epi-backend",
    "version": "3.5.0"
  }



