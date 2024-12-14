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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WishlistForm)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/supabase */ \"(app-pages-browser)/./utils/supabase.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction WishlistForm(param) {\n    let { userId } = param;\n    _s();\n    const [itemName, setItemName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [link, setLink] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [storeName, setStoreName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setError(null);\n        setSuccess(false);\n        try {\n            console.log(\"Submitting with user ID:\", userId); // Debug log\n            const { data, error } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from('wishlists').insert([\n                {\n                    user_id: userId,\n                    item_name: itemName,\n                    store: storeName || null,\n                    description: description || null,\n                    link: link || null\n                }\n            ]).select();\n            if (error) {\n                console.error('Supabase error:', error); // Debug log\n                throw error;\n            }\n            // Clear form\n            setItemName('');\n            setDescription('');\n            setStoreName('');\n            setLink('');\n            setSuccess(true);\n            console.log('Item added successfully:', data); // Debug log\n        } catch (error) {\n            setError(error.message || 'An error occurred while adding the item');\n            console.error('Error details:', error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-red-900 max-w-md mx-auto mb-8\",\n        children: [\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4\",\n                children: error\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 57,\n                columnNumber: 9\n            }, this),\n            success && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4\",\n                children: \"Item added successfully!\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 62,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                className: \"space-y-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: [\n                                    \"Item Name\",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"text-red-600\",\n                                        children: \"*\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                        lineNumber: 68,\n                                        columnNumber: 50\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 68,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: itemName,\n                                onChange: (e)=>setItemName(e.target.value),\n                                className: \"w-full p-2 border rounded\",\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 69,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 67,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Brand/Store\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 78,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: storeName,\n                                onChange: (e)=>setItemName(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 79,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Description\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 87,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                value: description,\n                                onChange: (e)=>setDescription(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 88,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 86,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Link\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 95,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: link,\n                                onChange: (e)=>setLink(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 96,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 94,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600\",\n                        children: \"Add Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 103,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n        lineNumber: 55,\n        columnNumber: 5\n    }, this);\n}\n_s(WishlistForm, \"IjBjy+1As1pgOuzyHaHAXBtsDbs=\");\n_c = WishlistForm;\nvar _c;\n$RefreshReg$(_c, \"WishlistForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0Rm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVpQztBQUNrQjtBQUNwQyxTQUFTRSxhQUFhLEtBQThCO1FBQTlCLEVBQUVDLE1BQU0sRUFBc0IsR0FBOUI7O0lBQ25DLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNNLGFBQWFDLGVBQWUsR0FBR1AsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUSxNQUFNQyxRQUFRLEdBQUdULCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ1UsV0FBV0MsYUFBYSxHQUFHWCwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNZLE9BQU9DLFNBQVMsR0FBR2IsK0NBQVFBLENBQWdCO0lBQ2xELE1BQU0sQ0FBQ2MsU0FBU0MsV0FBVyxHQUFHZiwrQ0FBUUEsQ0FBQztJQUV2QyxNQUFNZ0IsZUFBZSxPQUFPQztRQUMxQkEsRUFBRUMsY0FBYztRQUNoQkwsU0FBUztRQUNURSxXQUFXO1FBRVgsSUFBSTtZQUNGSSxRQUFRQyxHQUFHLENBQUMsNEJBQTRCakIsU0FBUyxZQUFZO1lBRTdELE1BQU0sRUFBRWtCLElBQUksRUFBRVQsS0FBSyxFQUFFLEdBQUcsTUFBTVgscURBQVFBLENBQ25DcUIsSUFBSSxDQUFDLGFBQ0xDLE1BQU0sQ0FBQztnQkFDTjtvQkFDRUMsU0FBU3JCO29CQUNUc0IsV0FBV3JCO29CQUNYc0IsT0FBT2hCLGFBQWE7b0JBQ3BCSixhQUFhQSxlQUFlO29CQUM1QkUsTUFBTUEsUUFBUTtnQkFDaEI7YUFDRCxFQUNBbUIsTUFBTTtZQUVULElBQUlmLE9BQU87Z0JBQ1RPLFFBQVFQLEtBQUssQ0FBQyxtQkFBbUJBLFFBQVEsWUFBWTtnQkFDckQsTUFBTUE7WUFDUjtZQUVBLGFBQWE7WUFDYlAsWUFBWTtZQUNaRSxlQUFlO1lBQ2ZJLGFBQWE7WUFDYkYsUUFBUTtZQUNSTSxXQUFXO1lBRVhJLFFBQVFDLEdBQUcsQ0FBQyw0QkFBNEJDLE9BQU8sWUFBWTtRQUU3RCxFQUFFLE9BQU9ULE9BQVk7WUFDbkJDLFNBQVNELE1BQU1nQixPQUFPLElBQUk7WUFDMUJULFFBQVFQLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2xDO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2lCO1FBQUlDLFdBQVU7O1lBQ1psQix1QkFDQyw4REFBQ2lCO2dCQUFJQyxXQUFVOzBCQUNabEI7Ozs7OztZQUdKRSx5QkFDQyw4REFBQ2U7Z0JBQUlDLFdBQVU7MEJBQTZFOzs7Ozs7MEJBSTlGLDhEQUFDQztnQkFBS0MsVUFBVWhCO2dCQUFjYyxXQUFVOztrQ0FDdEMsOERBQUNEOzswQ0FDQyw4REFBQ0k7Z0NBQU1ILFdBQVU7O29DQUFhO2tEQUFTLDhEQUFDSTt3Q0FBS0osV0FBVTtrREFBZTs7Ozs7Ozs7Ozs7OzBDQUN0RSw4REFBQ0s7Z0NBQ0NDLE1BQUs7Z0NBQ0xDLE9BQU9qQztnQ0FDUGtDLFVBQVUsQ0FBQ3JCLElBQU1aLFlBQVlZLEVBQUVzQixNQUFNLENBQUNGLEtBQUs7Z0NBQzNDUCxXQUFVO2dDQUNWVSxRQUFROzs7Ozs7Ozs7Ozs7a0NBR1osOERBQUNYOzswQ0FDQyw4REFBQ0k7Z0NBQU1ILFdBQVU7MENBQWE7Ozs7OzswQ0FDOUIsOERBQUNLO2dDQUNDQyxNQUFLO2dDQUNMQyxPQUFPM0I7Z0NBQ1A0QixVQUFVLENBQUNyQixJQUFNWixZQUFZWSxFQUFFc0IsTUFBTSxDQUFDRixLQUFLO2dDQUMzQ1AsV0FBVTs7Ozs7Ozs7Ozs7O2tDQUdkLDhEQUFDRDs7MENBQ0MsOERBQUNJO2dDQUFNSCxXQUFVOzBDQUFhOzs7Ozs7MENBQzlCLDhEQUFDVztnQ0FDQ0osT0FBTy9CO2dDQUNQZ0MsVUFBVSxDQUFDckIsSUFBTVYsZUFBZVUsRUFBRXNCLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDOUNQLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FHZCw4REFBQ0Q7OzBDQUNDLDhEQUFDSTtnQ0FBTUgsV0FBVTswQ0FBYTs7Ozs7OzBDQUM5Qiw4REFBQ0s7Z0NBQ0NDLE1BQUs7Z0NBQ0xDLE9BQU83QjtnQ0FDUDhCLFVBQVUsQ0FBQ3JCLElBQU1SLFFBQVFRLEVBQUVzQixNQUFNLENBQUNGLEtBQUs7Z0NBQ3ZDUCxXQUFVOzs7Ozs7Ozs7Ozs7a0NBR2QsOERBQUNZO3dCQUNDTixNQUFLO3dCQUNMTixXQUFVO2tDQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNVDtHQTNHd0I1QjtLQUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL2phc29ucGVuZzcvd2lzaGxpc3RfYXBwL3dpc2hsaXN0X29yZ2FuaXplci9zcmMvYXBwL2Rhc2hib2FyZC9XaXNoTGlzdEZvcm0udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3N1cGFiYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXaXNobGlzdEZvcm0oeyB1c2VySWQgfTogeyB1c2VySWQ6IHN0cmluZyB9KSB7XG4gIGNvbnN0IFtpdGVtTmFtZSwgc2V0SXRlbU5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2xpbmssIHNldExpbmtdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3RvcmVOYW1lLCBzZXRTdG9yZU5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBzZXRTdWNjZXNzKGZhbHNlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmcgd2l0aCB1c2VyIElEOlwiLCB1c2VySWQpOyAvLyBEZWJ1ZyBsb2dcblxuICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ3dpc2hsaXN0cycpXG4gICAgICAgIC5pbnNlcnQoW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGl0ZW1fbmFtZTogaXRlbU5hbWUsXG4gICAgICAgICAgICBzdG9yZTogc3RvcmVOYW1lIHx8IG51bGwsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgbnVsbCwgLy8gSGFuZGxlIGVtcHR5IGRlc2NyaXB0aW9uXG4gICAgICAgICAgICBsaW5rOiBsaW5rIHx8IG51bGwsIC8vIEhhbmRsZSBlbXB0eSBsaW5rXG4gICAgICAgICAgfVxuICAgICAgICBdKVxuICAgICAgICAuc2VsZWN0KCk7XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTdXBhYmFzZSBlcnJvcjonLCBlcnJvcik7IC8vIERlYnVnIGxvZ1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZm9ybVxuICAgICAgc2V0SXRlbU5hbWUoJycpO1xuICAgICAgc2V0RGVzY3JpcHRpb24oJycpO1xuICAgICAgc2V0U3RvcmVOYW1lKCcnKTtcbiAgICAgIHNldExpbmsoJycpO1xuICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcblxuICAgICAgY29uc29sZS5sb2coJ0l0ZW0gYWRkZWQgc3VjY2Vzc2Z1bGx5OicsIGRhdGEpOyAvLyBEZWJ1ZyBsb2dcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHNldEVycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyB0aGUgaXRlbScpO1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGV0YWlsczonLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtOTAwIG1heC13LW1kIG14LWF1dG8gbWItOFwiPlxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtMTAwIGJvcmRlciBib3JkZXItcmVkLTQwMCB0ZXh0LXJlZC03MDAgcHgtNCBweS0zIHJvdW5kZWQgbWItNFwiPlxuICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyZWVuLTEwMCBib3JkZXIgYm9yZGVyLWdyZWVuLTQwMCB0ZXh0LWdyZWVuLTcwMCBweC00IHB5LTMgcm91bmRlZCBtYi00XCI+XG4gICAgICAgICAgSXRlbSBhZGRlZCBzdWNjZXNzZnVsbHkhXG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBtYi0yXCI+SXRlbSBOYW1lPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNjAwXCI+Kjwvc3Bhbj48L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgdmFsdWU9e2l0ZW1OYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJdGVtTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJvcmRlciByb3VuZGVkXCJcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIG1iLTJcIj5CcmFuZC9TdG9yZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17c3RvcmVOYW1lfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJdGVtTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJvcmRlciByb3VuZGVkXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgbWItMlwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHAtMiBib3JkZXIgcm91bmRlZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIG1iLTJcIj5MaW5rPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtsaW5rfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRMaW5rKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYm9yZGVyIHJvdW5kZWRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcC0yIHJvdW5kZWQgaG92ZXI6YmctYmx1ZS02MDBcIlxuICAgICAgICA+XG4gICAgICAgICAgQWRkIEl0ZW1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwic3VwYWJhc2UiLCJXaXNobGlzdEZvcm0iLCJ1c2VySWQiLCJpdGVtTmFtZSIsInNldEl0ZW1OYW1lIiwiZGVzY3JpcHRpb24iLCJzZXREZXNjcmlwdGlvbiIsImxpbmsiLCJzZXRMaW5rIiwic3RvcmVOYW1lIiwic2V0U3RvcmVOYW1lIiwiZXJyb3IiLCJzZXRFcnJvciIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJmcm9tIiwiaW5zZXJ0IiwidXNlcl9pZCIsIml0ZW1fbmFtZSIsInN0b3JlIiwic2VsZWN0IiwibWVzc2FnZSIsImRpdiIsImNsYXNzTmFtZSIsImZvcm0iLCJvblN1Ym1pdCIsImxhYmVsIiwic3BhbiIsImlucHV0IiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJyZXF1aXJlZCIsInRleHRhcmVhIiwiYnV0dG9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/WishListForm.tsx\n"));

/***/ })

});