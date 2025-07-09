import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.zul-8WDh.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BwBa27U2.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/CFYVZ7JT.js","_app/immutable/chunks/sdCM-dK-.js","_app/immutable/chunks/B1ucFUF-.js","_app/immutable/chunks/D1sbzrIj.js","_app/immutable/chunks/FcUKBLQe.js","_app/immutable/chunks/B90EQEFl.js","_app/immutable/chunks/Brcfy_Et.js","_app/immutable/chunks/DdNiMY7O.js"];
export const stylesheets = ["_app/immutable/assets/0.C25McktA.css"];
export const fonts = [];
