import { g as generateId, s as simulateNetworkDelay, a as simulateNetworkError, e as entregasMock, i as itenEstoqueMock, f as fichasEPIMock, c as colaboradoresMock, t as tiposEPIMock } from "./mockData.js";
class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
async function apiRequest(endpoint, options = {}) {
  const { method = "GET", data, delay = true } = options;
  if (delay) {
    await simulateNetworkDelay();
  }
  if (simulateNetworkError()) {
    throw new ApiError("Erro de conexão com o servidor", 500);
  }
  console.log(`[API Mock] ${method} ${endpoint}`, data ? { data } : "");
  return {};
}
function createCRUDAPI(entityName, mockData, endpoint) {
  return {
    async getAll() {
      await apiRequest(`${endpoint}`);
      return [...mockData];
    },
    async getById(id) {
      await apiRequest(`${endpoint}/${id}`);
      const item = mockData.find((item2) => item2.id === id);
      if (!item) {
        throw new ApiError(`${entityName} não encontrado`, 404);
      }
      return { ...item };
    },
    async create(data) {
      const newItem = {
        ...data,
        id: generateId(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      await apiRequest(`${endpoint}`, { method: "POST", data });
      mockData.push(newItem);
      return { ...newItem };
    },
    async update(id, data) {
      await apiRequest(`${endpoint}/${id}`, { method: "PUT", data });
      const index = mockData.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new ApiError(`${entityName} não encontrado`, 404);
      }
      const updatedItem = {
        ...mockData[index],
        ...data,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      mockData[index] = updatedItem;
      return { ...updatedItem };
    },
    async delete(id) {
      await apiRequest(`${endpoint}/${id}`, { method: "DELETE" });
      const index = mockData.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new ApiError(`${entityName} não encontrado`, 404);
      }
      mockData.splice(index, 1);
    }
  };
}
const tiposEPIAPI = createCRUDAPI("Tipo EPI", tiposEPIMock, "/tipos-epi");
const relatoriosAPI = {
  async getEstatisticas() {
    await apiRequest("/relatorios/estatisticas");
    return {
      totalColaboradores: colaboradoresMock.filter((c) => c.status === "ativo").length,
      fichasAtivas: fichasEPIMock.filter((f) => f.status === "ativo").length,
      fichasVencidas: fichasEPIMock.filter((f) => f.status === "vencido").length,
      estoqueTotal: itenEstoqueMock.reduce((total, item) => total + item.quantidade, 0),
      estoqueBaixo: itenEstoqueMock.filter(
        (item) => item.quantidadeMinima && item.quantidade <= item.quantidadeMinima
      ).length,
      entregasMes: entregasMock.filter((e) => {
        const entregaDate = new Date(e.dataEntrega);
        const now = /* @__PURE__ */ new Date();
        return entregaDate.getMonth() === now.getMonth() && entregaDate.getFullYear() === now.getFullYear();
      }).length
    };
  }
};
export {
  relatoriosAPI as r,
  tiposEPIAPI as t
};
