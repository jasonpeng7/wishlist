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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WishlistForm)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/supabase */ \"(app-pages-browser)/./utils/supabase.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction WishlistForm(param) {\n    let { userId } = param;\n    _s();\n    const [itemName, setItemName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [price, setPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setError(null);\n        setSuccess(false);\n        try {\n            console.log(\"Submitting with user ID:\", userId); // Debug log\n            const { data, error } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from('wishlists').insert([\n                {\n                    user_id: userId,\n                    item_name: itemName,\n                    description: description || null,\n                    price: price ? parseFloat(price) : null\n                }\n            ]).select();\n            if (error) {\n                console.error('Supabase error:', error); // Debug log\n                throw error;\n            }\n            // Clear form\n            setItemName('');\n            setDescription('');\n            setPrice('');\n            setSuccess(true);\n            console.log('Item added successfully:', data); // Debug log\n        } catch (error) {\n            setError(error.message || 'An error occurred while adding the item');\n            console.error('Error details:', error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-red-900 max-w-md mx-auto mb-8\",\n        children: [\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4\",\n                children: error\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, this),\n            success && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4\",\n                children: \"Item added successfully!\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 59,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                className: \"space-y-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Item Name\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 65,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: itemName,\n                                onChange: (e)=>setItemName(e.target.value),\n                                className: \"w-full p-2 border rounded\",\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 64,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Description\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                value: description,\n                                onChange: (e)=>setDescription(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Price\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 83,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"number\",\n                                value: price,\n                                onChange: (e)=>setPrice(e.target.value),\n                                className: \"w-full p-2 border rounded\",\n                                step: \"0.01\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600\",\n                        children: \"Add Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 92,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, this);\n}\n_s(WishlistForm, \"eR6lecp6NOzxvuONgKkDruF94Hc=\");\n_c = WishlistForm;\nvar _c;\n$RefreshReg$(_c, \"WishlistForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0Rm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVpQztBQUNrQjtBQUNwQyxTQUFTRSxhQUFhLEtBQThCO1FBQTlCLEVBQUVDLE1BQU0sRUFBc0IsR0FBOUI7O0lBQ25DLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNNLGFBQWFDLGVBQWUsR0FBR1AsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUSxPQUFPQyxTQUFTLEdBQUdULCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ1UsT0FBT0MsU0FBUyxHQUFHWCwrQ0FBUUEsQ0FBZ0I7SUFDbEQsTUFBTSxDQUFDWSxTQUFTQyxXQUFXLEdBQUdiLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1jLGVBQWUsT0FBT0M7UUFDMUJBLEVBQUVDLGNBQWM7UUFDaEJMLFNBQVM7UUFDVEUsV0FBVztRQUVYLElBQUk7WUFDRkksUUFBUUMsR0FBRyxDQUFDLDRCQUE0QmYsU0FBUyxZQUFZO1lBRTdELE1BQU0sRUFBRWdCLElBQUksRUFBRVQsS0FBSyxFQUFFLEdBQUcsTUFBTVQscURBQVFBLENBQ25DbUIsSUFBSSxDQUFDLGFBQ0xDLE1BQU0sQ0FBQztnQkFDTjtvQkFDRUMsU0FBU25CO29CQUNUb0IsV0FBV25CO29CQUNYRSxhQUFhQSxlQUFlO29CQUM1QkUsT0FBT0EsUUFBUWdCLFdBQVdoQixTQUFTO2dCQUNyQzthQUNELEVBQ0FpQixNQUFNO1lBRVQsSUFBSWYsT0FBTztnQkFDVE8sUUFBUVAsS0FBSyxDQUFDLG1CQUFtQkEsUUFBUSxZQUFZO2dCQUNyRCxNQUFNQTtZQUNSO1lBRUEsYUFBYTtZQUNiTCxZQUFZO1lBQ1pFLGVBQWU7WUFDZkUsU0FBUztZQUNUSSxXQUFXO1lBRVhJLFFBQVFDLEdBQUcsQ0FBQyw0QkFBNEJDLE9BQU8sWUFBWTtRQUU3RCxFQUFFLE9BQU9ULE9BQVk7WUFDbkJDLFNBQVNELE1BQU1nQixPQUFPLElBQUk7WUFDMUJULFFBQVFQLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2xDO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2lCO1FBQUlDLFdBQVU7O1lBQ1psQix1QkFDQyw4REFBQ2lCO2dCQUFJQyxXQUFVOzBCQUNabEI7Ozs7OztZQUdKRSx5QkFDQyw4REFBQ2U7Z0JBQUlDLFdBQVU7MEJBQTZFOzs7Ozs7MEJBSTlGLDhEQUFDQztnQkFBS0MsVUFBVWhCO2dCQUFjYyxXQUFVOztrQ0FDdEMsOERBQUNEOzswQ0FDQyw4REFBQ0k7Z0NBQU1ILFdBQVU7MENBQWE7Ozs7OzswQ0FDOUIsOERBQUNJO2dDQUNDQyxNQUFLO2dDQUNMQyxPQUFPOUI7Z0NBQ1ArQixVQUFVLENBQUNwQixJQUFNVixZQUFZVSxFQUFFcUIsTUFBTSxDQUFDRixLQUFLO2dDQUMzQ04sV0FBVTtnQ0FDVlMsUUFBUTs7Ozs7Ozs7Ozs7O2tDQUdaLDhEQUFDVjs7MENBQ0MsOERBQUNJO2dDQUFNSCxXQUFVOzBDQUFhOzs7Ozs7MENBQzlCLDhEQUFDVTtnQ0FDQ0osT0FBTzVCO2dDQUNQNkIsVUFBVSxDQUFDcEIsSUFBTVIsZUFBZVEsRUFBRXFCLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDOUNOLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FHZCw4REFBQ0Q7OzBDQUNDLDhEQUFDSTtnQ0FBTUgsV0FBVTswQ0FBYTs7Ozs7OzBDQUM5Qiw4REFBQ0k7Z0NBQ0NDLE1BQUs7Z0NBQ0xDLE9BQU8xQjtnQ0FDUDJCLFVBQVUsQ0FBQ3BCLElBQU1OLFNBQVNNLEVBQUVxQixNQUFNLENBQUNGLEtBQUs7Z0NBQ3hDTixXQUFVO2dDQUNWVyxNQUFLOzs7Ozs7Ozs7Ozs7a0NBR1QsOERBQUNDO3dCQUNDUCxNQUFLO3dCQUNMTCxXQUFVO2tDQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNVDtHQWhHd0IxQjtLQUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL2phc29ucGVuZzcvd2lzaGxpc3RfYXBwL3dpc2hsaXN0X29yZ2FuaXplci9zcmMvYXBwL2Rhc2hib2FyZC9XaXNoTGlzdEZvcm0udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3N1cGFiYXNlXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXaXNobGlzdEZvcm0oeyB1c2VySWQgfTogeyB1c2VySWQ6IHN0cmluZyB9KSB7XG4gIGNvbnN0IFtpdGVtTmFtZSwgc2V0SXRlbU5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZGVzY3JpcHRpb24sIHNldERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3ByaWNlLCBzZXRQcmljZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKG51bGwpO1xuICAgIHNldFN1Y2Nlc3MoZmFsc2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZyB3aXRoIHVzZXIgSUQ6XCIsIHVzZXJJZCk7IC8vIERlYnVnIGxvZ1xuXG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgnd2lzaGxpc3RzJylcbiAgICAgICAgLmluc2VydChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgICAgICAgaXRlbV9uYW1lOiBpdGVtTmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBudWxsLCAvLyBIYW5kbGUgZW1wdHkgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIHByaWNlOiBwcmljZSA/IHBhcnNlRmxvYXQocHJpY2UpIDogbnVsbCwgLy8gSGFuZGxlIGVtcHR5IHByaWNlXG4gICAgICAgICAgfVxuICAgICAgICBdKVxuICAgICAgICAuc2VsZWN0KCk7XG5cbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdTdXBhYmFzZSBlcnJvcjonLCBlcnJvcik7IC8vIERlYnVnIGxvZ1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgZm9ybVxuICAgICAgc2V0SXRlbU5hbWUoJycpO1xuICAgICAgc2V0RGVzY3JpcHRpb24oJycpO1xuICAgICAgc2V0UHJpY2UoJycpO1xuICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcblxuICAgICAgY29uc29sZS5sb2coJ0l0ZW0gYWRkZWQgc3VjY2Vzc2Z1bGx5OicsIGRhdGEpOyAvLyBEZWJ1ZyBsb2dcblxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHNldEVycm9yKGVycm9yLm1lc3NhZ2UgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyB0aGUgaXRlbScpO1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGV0YWlsczonLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtOTAwIG1heC13LW1kIG14LWF1dG8gbWItOFwiPlxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1yZWQtMTAwIGJvcmRlciBib3JkZXItcmVkLTQwMCB0ZXh0LXJlZC03MDAgcHgtNCBweS0zIHJvdW5kZWQgbWItNFwiPlxuICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3N1Y2Nlc3MgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyZWVuLTEwMCBib3JkZXIgYm9yZGVyLWdyZWVuLTQwMCB0ZXh0LWdyZWVuLTcwMCBweC00IHB5LTMgcm91bmRlZCBtYi00XCI+XG4gICAgICAgICAgSXRlbSBhZGRlZCBzdWNjZXNzZnVsbHkhXG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBtYi0yXCI+SXRlbSBOYW1lPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtpdGVtTmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SXRlbU5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHAtMiBib3JkZXIgcm91bmRlZFwiXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayBtYi0yXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9ufVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREZXNjcmlwdGlvbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJvcmRlciByb3VuZGVkXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgbWItMlwiPlByaWNlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgdmFsdWU9e3ByaWNlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQcmljZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJvcmRlciByb3VuZGVkXCJcbiAgICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlIHAtMiByb3VuZGVkIGhvdmVyOmJnLWJsdWUtNjAwXCJcbiAgICAgICAgPlxuICAgICAgICAgIEFkZCBJdGVtXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInN1cGFiYXNlIiwiV2lzaGxpc3RGb3JtIiwidXNlcklkIiwiaXRlbU5hbWUiLCJzZXRJdGVtTmFtZSIsImRlc2NyaXB0aW9uIiwic2V0RGVzY3JpcHRpb24iLCJwcmljZSIsInNldFByaWNlIiwiZXJyb3IiLCJzZXRFcnJvciIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJmcm9tIiwiaW5zZXJ0IiwidXNlcl9pZCIsIml0ZW1fbmFtZSIsInBhcnNlRmxvYXQiLCJzZWxlY3QiLCJtZXNzYWdlIiwiZGl2IiwiY2xhc3NOYW1lIiwiZm9ybSIsIm9uU3VibWl0IiwibGFiZWwiLCJpbnB1dCIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicmVxdWlyZWQiLCJ0ZXh0YXJlYSIsInN0ZXAiLCJidXR0b24iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/WishListForm.tsx\n"));

/***/ })

});