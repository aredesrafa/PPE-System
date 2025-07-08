import { format } from "date-fns";
function formatarData(date, fallback = "-") {
  if (!date) return fallback;
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy");
  } catch (error) {
    console.warn("Erro ao formatar data:", date, error);
    return fallback;
  }
}
export {
  formatarData as f
};
