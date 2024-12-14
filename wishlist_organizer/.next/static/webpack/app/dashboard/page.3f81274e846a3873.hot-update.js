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

/***/ "(app-pages-browser)/./src/app/dashboard/WishListForm.tsx":
/*!********************************************!*\
  !*** ./src/app/dashboard/WishListForm.tsx ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WishlistForm)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/supabase */ \"(app-pages-browser)/./utils/supabase.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction WishlistForm(param) {\n    let { userId } = param;\n    _s();\n    const [itemName, setItemName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [link, setLink] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setError(null);\n        setSuccess(false);\n        try {\n            console.log(\"Submitting with user ID:\", userId); // Debug log\n            const { data, error } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from('wishlists').insert([\n                {\n                    user_id: userId,\n                    item_name: itemName,\n                    description: description || null,\n                    link: link || null\n                }\n            ]).select();\n            if (error) {\n                console.error('Supabase error:', error); // Debug log\n                throw error;\n            }\n            // Clear form\n            setItemName('');\n            setDescription('');\n            setLink('');\n            setSuccess(true);\n            console.log('Item added successfully:', data); // Debug log\n        } catch (error) {\n            setError(error.message || 'An error occurred while adding the item');\n            console.error('Error details:', error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-red-900 max-w-md mx-auto mb-8\",\n        children: [\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4\",\n                children: error\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, this),\n            success && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4\",\n                children: \"Item added successfully!\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 59,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                className: \"space-y-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Item Name\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 65,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: itemName,\n                                onChange: (e)=>setItemName(e.target.value),\n                                className: \"w-full p-2 border rounded\",\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 64,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Description\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                value: description,\n                                onChange: (e)=>setDescription(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Link\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 83,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: price,\n                                onChange: (e)=>setLink(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600\",\n                        children: \"Add Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 91,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, this);\n}\n_s(WishlistForm, \"/8bfwMBOA+2pF2D0DlMtO5s9OPg=\");\n_c = WishlistForm;\nvar _c;\n$RefreshReg$(_c, \"WishlistForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0Rm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVpQztBQUNrQjtBQUNwQyxTQUFTRSxhQUFhLEtBQThCO1FBQTlCLEVBQUVDLE1BQU0sRUFBc0IsR0FBOUI7O0lBQ25DLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNNLGFBQWFDLGVBQWUsR0FBR1AsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUSxNQUFNQyxRQUFRLEdBQUdULCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ1UsT0FBT0MsU0FBUyxHQUFHWCwrQ0FBUUEsQ0FBZ0I7SUFDbEQsTUFBTSxDQUFDWSxTQUFTQyxXQUFXLEdBQUdiLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1jLGVBQWUsT0FBT0M7UUFDMUJBLEVBQUVDLGNBQWM7UUFDaEJMLFNBQVM7UUFDVEUsV0FBVztRQUVYLElBQUk7WUFDRkksUUFBUUMsR0FBRyxDQUFDLDRCQUE0QmYsU0FBUyxZQUFZO1lBRTdELE1BQU0sRUFBRWdCLElBQUksRUFBRVQsS0FBSyxFQUFFLEdBQUcsTUFBTVQscURBQVFBLENBQ25DbUIsSUFBSSxDQUFDLGFBQ0xDLE1BQU0sQ0FBQztnQkFDTjtvQkFDRUMsU0FBU25CO29CQUNUb0IsV0FBV25CO29CQUNYRSxhQUFhQSxlQUFlO29CQUM1QkUsTUFBTUEsUUFBUTtnQkFDaEI7YUFDRCxFQUNBZ0IsTUFBTTtZQUVULElBQUlkLE9BQU87Z0JBQ1RPLFFBQVFQLEtBQUssQ0FBQyxtQkFBbUJBLFFBQVEsWUFBWTtnQkFDckQsTUFBTUE7WUFDUjtZQUVBLGFBQWE7WUFDYkwsWUFBWTtZQUNaRSxlQUFlO1lBQ2ZFLFFBQVE7WUFDUkksV0FBVztZQUVYSSxRQUFRQyxHQUFHLENBQUMsNEJBQTRCQyxPQUFPLFlBQVk7UUFFN0QsRUFBRSxPQUFPVCxPQUFZO1lBQ25CQyxTQUFTRCxNQUFNZSxPQUFPLElBQUk7WUFDMUJSLFFBQVFQLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2xDO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2dCO1FBQUlDLFdBQVU7O1lBQ1pqQix1QkFDQyw4REFBQ2dCO2dCQUFJQyxXQUFVOzBCQUNaakI7Ozs7OztZQUdKRSx5QkFDQyw4REFBQ2M7Z0JBQUlDLFdBQVU7MEJBQTZFOzs7Ozs7MEJBSTlGLDhEQUFDQztnQkFBS0MsVUFBVWY7Z0JBQWNhLFdBQVU7O2tDQUN0Qyw4REFBQ0Q7OzBDQUNDLDhEQUFDSTtnQ0FBTUgsV0FBVTswQ0FBYTs7Ozs7OzBDQUM5Qiw4REFBQ0k7Z0NBQ0NDLE1BQUs7Z0NBQ0xDLE9BQU83QjtnQ0FDUDhCLFVBQVUsQ0FBQ25CLElBQU1WLFlBQVlVLEVBQUVvQixNQUFNLENBQUNGLEtBQUs7Z0NBQzNDTixXQUFVO2dDQUNWUyxRQUFROzs7Ozs7Ozs7Ozs7a0NBR1osOERBQUNWOzswQ0FDQyw4REFBQ0k7Z0NBQU1ILFdBQVU7MENBQWE7Ozs7OzswQ0FDOUIsOERBQUNVO2dDQUNDSixPQUFPM0I7Z0NBQ1A0QixVQUFVLENBQUNuQixJQUFNUixlQUFlUSxFQUFFb0IsTUFBTSxDQUFDRixLQUFLO2dDQUM5Q04sV0FBVTs7Ozs7Ozs7Ozs7O2tDQUdkLDhEQUFDRDs7MENBQ0MsOERBQUNJO2dDQUFNSCxXQUFVOzBDQUFhOzs7Ozs7MENBQzlCLDhEQUFDSTtnQ0FDQ0MsTUFBSztnQ0FDTEMsT0FBT0s7Z0NBQ1BKLFVBQVUsQ0FBQ25CLElBQU1OLFFBQVFNLEVBQUVvQixNQUFNLENBQUNGLEtBQUs7Z0NBQ3ZDTixXQUFVOzs7Ozs7Ozs7Ozs7a0NBR2QsOERBQUNZO3dCQUNDUCxNQUFLO3dCQUNMTCxXQUFVO2tDQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNVDtHQS9Gd0J6QjtLQUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL2phc29ucGVuZzcvd2lzaGxpc3RfYXBwL3dpc2hsaXN0X29yZ2FuaXplci9zcmMvYXBwL2Rhc2hib2FyZC9XaXNoTGlzdEZvcm0udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3N1cGFiYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXaXNobGlzdEZvcm0oeyB1c2VySWQgfTogeyB1c2VySWQ6IHN0cmluZyB9KSB7XG4gIGNvbnN0IFtpdGVtTmFtZSwgc2V0SXRlbU5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2xpbmssIHNldExpbmtdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBzZXRTdWNjZXNzKGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmcgd2l0aCB1c2VyIElEOlwiLCB1c2VySWQpOyAvLyBEZWJ1ZyBsb2dcblxuICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ3dpc2hsaXN0cycpXG4gICAgICAgIC5pbnNlcnQoW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGl0ZW1fbmFtZTogaXRlbU5hbWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgbnVsbCwgLy8gSGFuZGxlIGVtcHR5IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBsaW5rOiBsaW5rIHx8IG51bGwsIC8vIEhhbmRsZSBlbXB0eSBsaW5rXG4gICAgICAgICAgfVxuICAgICAgICBdKVxuICAgICAgICAuc2VsZWN0KCk7XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTdXBhYmFzZSBlcnJvcjonLCBlcnJvcik7IC8vIERlYnVnIGxvZ1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZm9ybVxuICAgICAgc2V0SXRlbU5hbWUoJycpO1xuICAgICAgc2V0RGVzY3JpcHRpb24oJycpO1xuICAgICAgc2V0TGluaygnJyk7XG4gICAgICBzZXRTdWNjZXNzKHRydWUpO1xuXG4gICAgICBjb25zb2xlLmxvZygnSXRlbSBhZGRlZCBzdWNjZXNzZnVsbHk6JywgZGF0YSk7IC8vIERlYnVnIGxvZ1xuXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgc2V0RXJyb3IoZXJyb3IubWVzc2FnZSB8fCAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIHRoZSBpdGVtJyk7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZXRhaWxzOicsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXJlZC05MDAgbWF4LXctbWQgbXgtYXV0byBtYi04XCI+XG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXJlZC0xMDAgYm9yZGVyIGJvcmRlci1yZWQtNDAwIHRleHQtcmVkLTcwMCBweC00IHB5LTMgcm91bmRlZCBtYi00XCI+XG4gICAgICAgICAge2Vycm9yfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7c3VjY2VzcyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JlZW4tMTAwIGJvcmRlciBib3JkZXItZ3JlZW4tNDAwIHRleHQtZ3JlZW4tNzAwIHB4LTQgcHktMyByb3VuZGVkIG1iLTRcIj5cbiAgICAgICAgICBJdGVtIGFkZGVkIHN1Y2Nlc3NmdWxseSFcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIG1iLTJcIj5JdGVtIE5hbWU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgdmFsdWU9e2l0ZW1OYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJdGVtTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJvcmRlciByb3VuZGVkXCJcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIG1iLTJcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICB2YWx1ZT17ZGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERlc2NyaXB0aW9uKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYm9yZGVyIHJvdW5kZWRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBtYi0yXCI+TGluazwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17cHJpY2V9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldExpbmsoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHAtMiBib3JkZXIgcm91bmRlZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmx1ZS01MDAgdGV4dC13aGl0ZSBwLTIgcm91bmRlZCBob3ZlcjpiZy1ibHVlLTYwMFwiXG4gICAgICAgID5cbiAgICAgICAgICBBZGQgSXRlbVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJzdXBhYmFzZSIsIldpc2hsaXN0Rm9ybSIsInVzZXJJZCIsIml0ZW1OYW1lIiwic2V0SXRlbU5hbWUiLCJkZXNjcmlwdGlvbiIsInNldERlc2NyaXB0aW9uIiwibGluayIsInNldExpbmsiLCJlcnJvciIsInNldEVycm9yIiwic3VjY2VzcyIsInNldFN1Y2Nlc3MiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImZyb20iLCJpbnNlcnQiLCJ1c2VyX2lkIiwiaXRlbV9uYW1lIiwic2VsZWN0IiwibWVzc2FnZSIsImRpdiIsImNsYXNzTmFtZSIsImZvcm0iLCJvblN1Ym1pdCIsImxhYmVsIiwiaW5wdXQiLCJ0eXBlIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsInJlcXVpcmVkIiwidGV4dGFyZWEiLCJwcmljZSIsImJ1dHRvbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/WishListForm.tsx\n"));

/***/ })

});