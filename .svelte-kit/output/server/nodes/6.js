

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/estoque/_page.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false,
  "csr": true
};
export const universal_id = "src/routes/estoque/+page.ts";
export const imports = ["_app/immutable/nodes/6.D7_0_cqu.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BMdB51sm.js","_app/immutable/chunks/BIKDjfmO.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Dwq3Do7L.js","_app/immutable/chunks/C1IGLM4g.js","_app/immutable/chunks/BL7Pvbk_.js"];
export const stylesheets = [];
export const fonts = [];
