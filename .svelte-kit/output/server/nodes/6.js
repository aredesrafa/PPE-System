

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/estoque/_page.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false,
  "csr": true
};
export const universal_id = "src/routes/estoque/+page.ts";
export const imports = ["_app/immutable/nodes/6.D4gqe5ui.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BW7nMWMn.js","_app/immutable/chunks/Bch6UWim.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];
