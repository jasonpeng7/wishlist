"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/app/dashboard/WishListItems.tsx":
/*!*********************************************!*\
  !*** ./src/app/dashboard/WishListItems.tsx ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WishlistItems)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/supabase */ \"(app-pages-browser)/./utils/supabase.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction WishlistItems(param) {\n    let { userId } = param;\n    _s();\n    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"WishlistItems.useEffect\": ()=>{\n            const fetchItems = {\n                \"WishlistItems.useEffect.fetchItems\": async ()=>{\n                    const { data, error } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from('wishlists').select('*').eq('user_id', userId).order('created_at', {\n                        ascending: false\n                    });\n                    if (error) {\n                        console.error('Error fetching items:', error);\n                        return;\n                    }\n                    setItems(data || []);\n                }\n            }[\"WishlistItems.useEffect.fetchItems\"];\n            fetchItems();\n        }\n    }[\"WishlistItems.useEffect\"], [\n        userId\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"grid gap-4 md:grid-cols-2 lg:grid-cols-3\",\n        children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4 bg-dark_gray max-h-20 overflow-y-auto\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"space-y-2\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            className: \"font-bold\",\n                            children: item.item_name\n                        }, void 0, false, {\n                            fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListItems.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-primary_text\",\n                            children: item.store\n                        }, void 0, false, {\n                            fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListItems.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-sm text-gray-500\",\n                            children: [\n                                \"Added on: \",\n                                new Date(item.created_at).toLocaleDateString()\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListItems.tsx\",\n                            lineNumber: 45,\n                            columnNumber: 17\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListItems.tsx\",\n                    lineNumber: 41,\n                    columnNumber: 13\n                }, this)\n            }, item.id, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListItems.tsx\",\n                lineNumber: 40,\n                columnNumber: 13\n            }, this))\n    }, void 0, false, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListItems.tsx\",\n        lineNumber: 38,\n        columnNumber: 9\n    }, this);\n}\n_s(WishlistItems, \"E85yb7BhBnl3/OpymRdjFiQJ97s=\");\n_c = WishlistItems;\nvar _c;\n$RefreshReg$(_c, \"WishlistItems\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0SXRlbXMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFNEM7QUFDTztBQVdwQyxTQUFTRyxjQUFjLEtBQTZCO1FBQTdCLEVBQUVDLE1BQU0sRUFBcUIsR0FBN0I7O0lBQ2xDLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHTCwrQ0FBUUEsQ0FBaUIsRUFBRTtJQUVyREQsZ0RBQVNBO21DQUFDO1lBQ04sTUFBTU87c0RBQWE7b0JBQ2YsTUFBTSxFQUFDQyxJQUFJLEVBQUVDLEtBQUssRUFBQyxHQUFHLE1BQU1QLHFEQUFRQSxDQUNuQ1EsSUFBSSxDQUFDLGFBQ0xDLE1BQU0sQ0FBQyxLQUNQQyxFQUFFLENBQUMsV0FBV1IsUUFDZFMsS0FBSyxDQUFDLGNBQWM7d0JBQUNDLFdBQVc7b0JBQUs7b0JBRXRDLElBQUdMLE9BQU87d0JBQ05NLFFBQVFOLEtBQUssQ0FBQyx5QkFBeUJBO3dCQUN2QztvQkFDSjtvQkFFQUgsU0FBU0UsUUFBUSxFQUFFO2dCQUN2Qjs7WUFFQUQ7UUFDSjtrQ0FBRztRQUFDSDtLQUFPO0lBRVgscUJBQ0ksOERBQUNZO1FBQUlDLFdBQVU7a0JBQ2RaLE1BQU1hLEdBQUcsQ0FBQyxDQUFDQyxxQkFDUiw4REFBQ0g7Z0JBQWtCQyxXQUFVOzBCQUM3Qiw0RUFBQ0Q7b0JBQUlDLFdBQVU7O3NDQUNYLDhEQUFDRzs0QkFBR0gsV0FBVTtzQ0FBYUUsS0FBS0UsU0FBUzs7Ozs7O3NDQUN6Qyw4REFBQ0M7NEJBQUVMLFdBQVU7c0NBQXFCRSxLQUFLSSxLQUFLOzs7Ozs7c0NBRTVDLDhEQUFDRDs0QkFBRUwsV0FBVTs7Z0NBQXdCO2dDQUMxQixJQUFJTyxLQUFLTCxLQUFLTSxVQUFVLEVBQUVDLGtCQUFrQjs7Ozs7Ozs7Ozs7OztlQU5qRFAsS0FBS1EsRUFBRTs7Ozs7Ozs7OztBQWE3QjtHQXRDd0J4QjtLQUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL2phc29ucGVuZzcvd2lzaGxpc3RfYXBwL3dpc2hsaXN0X29yZ2FuaXplci9zcmMvYXBwL2Rhc2hib2FyZC9XaXNoTGlzdEl0ZW1zLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3N1cGFiYXNlXCI7XG5cbnR5cGUgV2lzaGxpc3RJdGVtID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXRlbV9uYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBsaW5rOiBzdHJpbmc7XG4gICAgc3RvcmU6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXaXNobGlzdEl0ZW1zKHsgdXNlcklkIH06IHsgdXNlcklkOiBzdHJpbmd9KSB7XG4gICAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxXaXNobGlzdEl0ZW1bXT4oW10pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hJdGVtcyA9IGFzeW5jKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qge2RhdGEsIGVycm9yfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgICAuZnJvbSgnd2lzaGxpc3RzJylcbiAgICAgICAgICAgIC5zZWxlY3QoJyonKVxuICAgICAgICAgICAgLmVxKCd1c2VyX2lkJywgdXNlcklkKVxuICAgICAgICAgICAgLm9yZGVyKCdjcmVhdGVkX2F0Jywge2FzY2VuZGluZzogZmFsc2V9KTtcblxuICAgICAgICAgICAgaWYoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBpdGVtczonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRJdGVtcyhkYXRhIHx8IFtdKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmZXRjaEl0ZW1zKCk7XG4gICAgfSwgW3VzZXJJZF0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdhcC00IG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zXCI+XG4gICAgICAgIHtpdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgIDxkaXYga2V5PXtpdGVtLmlkfSBjbGFzc05hbWU9XCJwLTQgYmctZGFya19ncmF5IG1heC1oLTIwIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+e2l0ZW0uaXRlbV9uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5X3RleHRcIj57aXRlbS5zdG9yZX08L3A+XG4gICAgICAgICAgICAgICAgey8qIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDBcIj57aXRlbS5kZXNjcmlwdGlvbn08L3A+ICovfVxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgIEFkZGVkIG9uOiB7bmV3IERhdGUoaXRlbS5jcmVhdGVkX2F0KS50b0xvY2FsZURhdGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApOyAgICBcbn0iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzdXBhYmFzZSIsIldpc2hsaXN0SXRlbXMiLCJ1c2VySWQiLCJpdGVtcyIsInNldEl0ZW1zIiwiZmV0Y2hJdGVtcyIsImRhdGEiLCJlcnJvciIsImZyb20iLCJzZWxlY3QiLCJlcSIsIm9yZGVyIiwiYXNjZW5kaW5nIiwiY29uc29sZSIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsIml0ZW0iLCJoMyIsIml0ZW1fbmFtZSIsInAiLCJzdG9yZSIsIkRhdGUiLCJjcmVhdGVkX2F0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiaWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/WishListItems.tsx\n"));

/***/ })

});