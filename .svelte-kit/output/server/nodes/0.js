import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C8gfHbeN.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/D8ZBcRFv.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/V03hm1sS.js","_app/immutable/chunks/H0tinE9G.js","_app/immutable/chunks/INiUvie6.js","_app/immutable/chunks/BP7MfaEB.js","_app/immutable/chunks/CEMPKOvn.js","_app/immutable/chunks/44kBUpOD.js","_app/immutable/chunks/sSwz5yMW.js","_app/immutable/chunks/B4208FRW.js","_app/immutable/chunks/C7oAVmsz.js"];
export const stylesheets = ["_app/immutable/assets/0.DqgDU2Xu.css"];
export const fonts = [];
