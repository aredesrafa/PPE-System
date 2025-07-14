export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "epi35-front/_app",
	assets: new Set([".nojekyll","favicon.png","favicon.svg","logo-icon.svg","logo-text.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.C3XJUTr7.js",app:"_app/immutable/entry/app.CRw3E3sx.js",imports:["_app/immutable/entry/start.C3XJUTr7.js","_app/immutable/chunks/BHEEiOHL.js","_app/immutable/chunks/BMdB51sm.js","_app/immutable/chunks/B-FKEqiI.js","_app/immutable/chunks/ByuxXdLz.js","_app/immutable/entry/app.CRw3E3sx.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/BMdB51sm.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/epi35-front/","/epi35-front/admin","/epi35-front/catalogo","/epi35-front/configuracoes","/epi35-front/estoque","/epi35-front/fichas","/epi35-front/notas","/epi35-front/relatorios","/epi35-front/relatorios/auditoria"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
