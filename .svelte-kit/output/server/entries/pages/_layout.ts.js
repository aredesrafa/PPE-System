const prerender = true;
const load = async ({ fetch }) => {
  console.log("🚀 Inicializando aplicação - SSR mode");
  return {
    // Configurações padrão para SSR, serão substituídas no cliente
    configuration: {
      PERMITIR_ESTOQUE_NEGATIVO: false,
      PERMITIR_AJUSTES_FORCADOS: false,
      ESTOQUE_MINIMO_EQUIPAMENTO: 10,
      useV2Routes: false,
      enableAdvancedReports: true
    }
  };
};
export {
  load,
  prerender
};
