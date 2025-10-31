/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/dashboard/stats/route";
exports.ids = ["app/api/dashboard/stats/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Fstats%2Froute&page=%2Fapi%2Fdashboard%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fstats%2Froute.ts&appDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Fstats%2Froute&page=%2Fapi%2Fdashboard%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fstats%2Froute.ts&appDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_oficina_Desktop_proyectos_windsurf_prospectar_app_api_dashboard_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/dashboard/stats/route.ts */ \"(rsc)/./app/api/dashboard/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/dashboard/stats/route\",\n        pathname: \"/api/dashboard/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/dashboard/stats/route\"\n    },\n    resolvedPagePath: \"/Users/oficina/Desktop/proyectos-windsurf/prospectar/app/api/dashboard/stats/route.ts\",\n    nextConfigOutput,\n    userland: _Users_oficina_Desktop_proyectos_windsurf_prospectar_app_api_dashboard_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZkYXNoYm9hcmQlMkZzdGF0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZGFzaGJvYXJkJTJGc3RhdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZkYXNoYm9hcmQlMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm9maWNpbmElMkZEZXNrdG9wJTJGcHJveWVjdG9zLXdpbmRzdXJmJTJGcHJvc3BlY3RhciUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZvZmljaW5hJTJGRGVza3RvcCUyRnByb3llY3Rvcy13aW5kc3VyZiUyRnByb3NwZWN0YXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3FDO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsid2VicGFjazovLy8/ZjIwNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL29maWNpbmEvRGVza3RvcC9wcm95ZWN0b3Mtd2luZHN1cmYvcHJvc3BlY3Rhci9hcHAvYXBpL2Rhc2hib2FyZC9zdGF0cy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZGFzaGJvYXJkL3N0YXRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZGFzaGJvYXJkL3N0YXRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9kYXNoYm9hcmQvc3RhdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvb2ZpY2luYS9EZXNrdG9wL3Byb3llY3Rvcy13aW5kc3VyZi9wcm9zcGVjdGFyL2FwcC9hcGkvZGFzaGJvYXJkL3N0YXRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Fstats%2Froute&page=%2Fapi%2Fdashboard%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fstats%2Froute.ts&appDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/dashboard/stats/route.ts":
/*!******************************************!*\
  !*** ./app/api/dashboard/stats/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function GET() {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'No autorizado'\n            }, {\n                status: 401\n            });\n        }\n        const userId = session.user.id;\n        // Obtener estadísticas\n        const [prospectos, seguimientos, interacciones, conversiones] = await Promise.all([\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.prospecto.count({\n                where: {\n                    ownerId: userId\n                }\n            }),\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.seguimiento.count({\n                where: {\n                    assignedToId: userId,\n                    estado: 'PENDIENTE',\n                    fechaProgramada: {\n                        gte: new Date(new Date().setHours(0, 0, 0, 0)),\n                        lt: new Date(new Date().setHours(23, 59, 59, 999))\n                    }\n                }\n            }),\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.interaccion.count({\n                where: {\n                    userId: userId,\n                    createdAt: {\n                        gte: new Date(new Date().setDate(new Date().getDate() - 7))\n                    }\n                }\n            }),\n            _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.prospecto.count({\n                where: {\n                    ownerId: userId,\n                    estado: 'GANADO',\n                    updatedAt: {\n                        gte: new Date(new Date().setDate(1))\n                    }\n                }\n            })\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            prospectos,\n            seguimientos,\n            interacciones,\n            conversiones\n        });\n    } catch (error) {\n        console.error('Error getting stats:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Error interno'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Rhc2hib2FyZC9zdGF0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEM7QUFDRTtBQUNKO0FBQ0g7QUFFOUIsZUFBZUk7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTUosMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsSUFBSSxDQUFDRyxTQUFTQyxNQUFNO1lBQ2xCLE9BQU9OLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZ0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JFO1FBRUEsTUFBTUMsU0FBUyxRQUFTSixJQUFJLENBQVNLLEVBQUU7UUFFdkMsdUJBQXVCO1FBQ3ZCLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBY0MsZUFBZUMsYUFBYSxHQUFHLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQztZQUNoRmQsK0NBQU1BLENBQUNlLFNBQVMsQ0FBQ0MsS0FBSyxDQUFDO2dCQUNyQkMsT0FBTztvQkFBRUMsU0FBU1g7Z0JBQU87WUFDM0I7WUFDQVAsK0NBQU1BLENBQUNtQixXQUFXLENBQUNILEtBQUssQ0FBQztnQkFDdkJDLE9BQU87b0JBQ0xHLGNBQWNiO29CQUNkYyxRQUFRO29CQUNSQyxpQkFBaUI7d0JBQ2ZDLEtBQUssSUFBSUMsS0FBSyxJQUFJQSxPQUFPQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUc7d0JBQzNDQyxJQUFJLElBQUlGLEtBQUssSUFBSUEsT0FBT0MsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJO29CQUMvQztnQkFDRjtZQUNGO1lBQ0F6QiwrQ0FBTUEsQ0FBQzJCLFdBQVcsQ0FBQ1gsS0FBSyxDQUFDO2dCQUN2QkMsT0FBTztvQkFDTFYsUUFBUUE7b0JBQ1JxQixXQUFXO3dCQUNUTCxLQUFLLElBQUlDLEtBQUssSUFBSUEsT0FBT0ssT0FBTyxDQUFDLElBQUlMLE9BQU9NLE9BQU8sS0FBSztvQkFDMUQ7Z0JBQ0Y7WUFDRjtZQUNBOUIsK0NBQU1BLENBQUNlLFNBQVMsQ0FBQ0MsS0FBSyxDQUFDO2dCQUNyQkMsT0FBTztvQkFDTEMsU0FBU1g7b0JBQ1RjLFFBQVE7b0JBQ1JVLFdBQVc7d0JBQ1RSLEtBQUssSUFBSUMsS0FBSyxJQUFJQSxPQUFPSyxPQUFPLENBQUM7b0JBQ25DO2dCQUNGO1lBQ0Y7U0FDRDtRQUVELE9BQU9oQyxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQ3ZCSztZQUNBQztZQUNBQztZQUNBQztRQUNGO0lBQ0YsRUFBRSxPQUFPUCxPQUFPO1FBQ2QyQixRQUFRM0IsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT1IscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYXBpL2Rhc2hib2FyZC9zdGF0cy9yb3V0ZS50cz9jNjZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcbiAgICBcbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gYXV0b3JpemFkbycgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cblxuICAgIGNvbnN0IHVzZXJJZCA9IChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZFxuXG4gICAgLy8gT2J0ZW5lciBlc3RhZMOtc3RpY2FzXG4gICAgY29uc3QgW3Byb3NwZWN0b3MsIHNlZ3VpbWllbnRvcywgaW50ZXJhY2Npb25lcywgY29udmVyc2lvbmVzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHByaXNtYS5wcm9zcGVjdG8uY291bnQoe1xuICAgICAgICB3aGVyZTogeyBvd25lcklkOiB1c2VySWQgfVxuICAgICAgfSksXG4gICAgICBwcmlzbWEuc2VndWltaWVudG8uY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIGFzc2lnbmVkVG9JZDogdXNlcklkLFxuICAgICAgICAgIGVzdGFkbzogJ1BFTkRJRU5URScsXG4gICAgICAgICAgZmVjaGFQcm9ncmFtYWRhOiB7XG4gICAgICAgICAgICBndGU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuc2V0SG91cnMoMCwgMCwgMCwgMCkpLFxuICAgICAgICAgICAgbHQ6IG5ldyBEYXRlKG5ldyBEYXRlKCkuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgcHJpc21hLmludGVyYWNjaW9uLmNvdW50KHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICAgIGd0ZTogbmV3IERhdGUobmV3IERhdGUoKS5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC0gNykpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHByaXNtYS5wcm9zcGVjdG8uY291bnQoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIG93bmVySWQ6IHVzZXJJZCxcbiAgICAgICAgICBlc3RhZG86ICdHQU5BRE8nLFxuICAgICAgICAgIHVwZGF0ZWRBdDoge1xuICAgICAgICAgICAgZ3RlOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldERhdGUoMSkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIF0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgcHJvc3BlY3RvcyxcbiAgICAgIHNlZ3VpbWllbnRvcyxcbiAgICAgIGludGVyYWNjaW9uZXMsXG4gICAgICBjb252ZXJzaW9uZXNcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGdldHRpbmcgc3RhdHM6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdFcnJvciBpbnRlcm5vJyB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJHRVQiLCJzZXNzaW9uIiwidXNlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVzZXJJZCIsImlkIiwicHJvc3BlY3RvcyIsInNlZ3VpbWllbnRvcyIsImludGVyYWNjaW9uZXMiLCJjb252ZXJzaW9uZXMiLCJQcm9taXNlIiwiYWxsIiwicHJvc3BlY3RvIiwiY291bnQiLCJ3aGVyZSIsIm93bmVySWQiLCJzZWd1aW1pZW50byIsImFzc2lnbmVkVG9JZCIsImVzdGFkbyIsImZlY2hhUHJvZ3JhbWFkYSIsImd0ZSIsIkRhdGUiLCJzZXRIb3VycyIsImx0IiwiaW50ZXJhY2Npb24iLCJjcmVhdGVkQXQiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInVwZGF0ZWRBdCIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/dashboard/stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    // NO usar PrismaAdapter con CredentialsProvider - incompatible\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) {\n                        return null;\n                    }\n                    const user = await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    if (!user || !user.password) {\n                        return null;\n                    }\n                    const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                    if (!isPasswordValid) {\n                        return null;\n                    }\n                    return {\n                        id: user.id,\n                        email: user.email || '',\n                        name: user.name || '',\n                        role: user.role\n                    };\n                } catch (error) {\n                    console.error('Auth error:', error);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                return {\n                    ...token,\n                    id: user.id,\n                    role: user.role\n                };\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            return {\n                ...session,\n                user: {\n                    ...session.user,\n                    id: token.id,\n                    role: token.role\n                }\n            };\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    cookies: {\n        sessionToken: {\n            name: `next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: 'lax',\n                path: '/',\n                secure: \"development\" === 'production'\n            }\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    debug: \"development\" === \"development\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNpRTtBQUNoQztBQUNOO0FBRXBCLE1BQU1HLGNBQStCO0lBQzFDLCtEQUErRDtJQUMvREMsV0FBVztRQUNUSiwyRUFBbUJBLENBQUM7WUFDbEJLLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJO29CQUNGLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO3dCQUNqRCxPQUFPO29CQUNUO29CQUVBLE1BQU1FLE9BQU8sTUFBTVgsMkNBQU1BLENBQUNXLElBQUksQ0FBQ0MsVUFBVSxDQUFDO3dCQUN4Q0MsT0FBTzs0QkFBRVAsT0FBT0QsWUFBWUMsS0FBSzt3QkFBQztvQkFDcEM7b0JBRUEsSUFBSSxDQUFDSyxRQUFRLENBQUNBLEtBQUtGLFFBQVEsRUFBRTt3QkFDM0IsT0FBTztvQkFDVDtvQkFFQSxNQUFNSyxrQkFBa0IsTUFBTWIscURBQWMsQ0FDMUNJLFlBQVlJLFFBQVEsRUFDcEJFLEtBQUtGLFFBQVE7b0JBR2YsSUFBSSxDQUFDSyxpQkFBaUI7d0JBQ3BCLE9BQU87b0JBQ1Q7b0JBRUEsT0FBTzt3QkFDTEUsSUFBSUwsS0FBS0ssRUFBRTt3QkFDWFYsT0FBT0ssS0FBS0wsS0FBSyxJQUFJO3dCQUNyQkYsTUFBTU8sS0FBS1AsSUFBSSxJQUFJO3dCQUNuQmEsTUFBTU4sS0FBS00sSUFBSTtvQkFDakI7Z0JBQ0YsRUFBRSxPQUFPQyxPQUFPO29CQUNkQyxRQUFRRCxLQUFLLENBQUMsZUFBZUE7b0JBQzdCLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0tBQ0Q7SUFDREUsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFWCxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUixPQUFPO29CQUNMLEdBQUdXLEtBQUs7b0JBQ1JOLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hDLE1BQU0sS0FBY0EsSUFBSTtnQkFDMUI7WUFDRjtZQUNBLE9BQU9LO1FBQ1Q7UUFDQSxNQUFNQyxTQUFRLEVBQUVBLE9BQU8sRUFBRUQsS0FBSyxFQUFFO1lBQzlCLE9BQU87Z0JBQ0wsR0FBR0MsT0FBTztnQkFDVlosTUFBTTtvQkFDSixHQUFHWSxRQUFRWixJQUFJO29CQUNmSyxJQUFJTSxNQUFNTixFQUFFO29CQUNaQyxNQUFNSyxNQUFNTCxJQUFJO2dCQUNsQjtZQUNGO1FBQ0Y7SUFDRjtJQUNBTyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBRixTQUFTO1FBQ1BHLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUN6QjtJQUNBQyxTQUFTO1FBQ1BDLGNBQWM7WUFDWnpCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztZQUMvQjBCLFNBQVM7Z0JBQ1BDLFVBQVU7Z0JBQ1ZDLFVBQVU7Z0JBQ1ZDLE1BQU07Z0JBQ05DLFFBQVFDLGtCQUF5QjtZQUNuQztRQUNGO0lBQ0Y7SUFDQUMsUUFBUUQsUUFBUUUsR0FBRyxDQUFDQyxlQUFlO0lBQ25DQyxPQUFPSixrQkFBeUI7QUFDbEMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi9wcmlzbWFcIlxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0XCJcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIC8vIE5PIHVzYXIgUHJpc21hQWRhcHRlciBjb24gQ3JlZGVudGlhbHNQcm92aWRlciAtIGluY29tcGF0aWJsZVxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH1cbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxuICAgICAgICAgICAgY3JlZGVudGlhbHMucGFzc3dvcmQsXG4gICAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwgfHwgJycsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgfHwgJycsXG4gICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGggZXJyb3I6JywgZXJyb3IpXG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udG9rZW4sXG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgcm9sZTogKHVzZXIgYXMgYW55KS5yb2xlLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zZXNzaW9uLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgLi4uc2Vzc2lvbi51c2VyLFxuICAgICAgICAgIGlkOiB0b2tlbi5pZCBhcyBzdHJpbmcsXG4gICAgICAgICAgcm9sZTogdG9rZW4ucm9sZSBhcyBzdHJpbmcsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkw61hc1xuICB9LFxuICBjb29raWVzOiB7XG4gICAgc2Vzc2lvblRva2VuOiB7XG4gICAgICBuYW1lOiBgbmV4dC1hdXRoLnNlc3Npb24tdG9rZW5gLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgc2FtZVNpdGU6ICdsYXgnLFxuICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiLFxufVxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsImVycm9yIiwiY29uc29sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwicHJvY2VzcyIsInNlY3JldCIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsImRlYnVnIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'query',\n        'error',\n        'warn'\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBNkM7QUFFN0MsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsQ0FBQztJQUMvREksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RixHQUFFO0FBRUYsSUFBSUEsSUFBcUMsRUFBRUosZ0JBQWdCRSxNQUFNLEdBQUdBO0FBQ3BFLGlFQUFlQSxNQUFNQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KHtcbiAgbG9nOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IFsncXVlcnknLCAnZXJyb3InLCAnd2FybiddIDogWydlcnJvciddLFxufSlcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcbmV4cG9ydCBkZWZhdWx0IHByaXNtYVxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@opentelemetry","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/@panva","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fdashboard%2Fstats%2Froute&page=%2Fapi%2Fdashboard%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fdashboard%2Fstats%2Froute.ts&appDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Foficina%2FDesktop%2Fproyectos-windsurf%2Fprospectar&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();