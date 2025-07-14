import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Irk6lFHy.js","_app/immutable/chunks/BMdB51sm.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/DV0aLKez.js","_app/immutable/chunks/B-FKEqiI.js","_app/immutable/chunks/Dwq3Do7L.js","_app/immutable/chunks/BIKDjfmO.js","_app/immutable/chunks/BnY4cD5O.js","_app/immutable/chunks/BIt5QlSh.js","_app/immutable/chunks/B_tc1dUb.js","_app/immutable/chunks/AdwpSj15.js","_app/immutable/chunks/BbWW3oEJ.js","_app/immutable/chunks/ByuxXdLz.js","_app/immutable/chunks/wIfphin8.js","_app/immutable/chunks/BHEEiOHL.js"];
export const stylesheets = ["_app/immutable/assets/0.CG3iYC-J.css"];
export const fonts = [];
