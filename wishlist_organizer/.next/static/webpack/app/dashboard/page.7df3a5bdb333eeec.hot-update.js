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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WishlistForm)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/supabase */ \"(app-pages-browser)/./utils/supabase.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction WishlistForm(param) {\n    let { userId } = param;\n    _s();\n    const [itemName, setItemName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [link, setLink] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setError(null);\n        setSuccess(false);\n        try {\n            console.log(\"Submitting with user ID:\", userId); // Debug log\n            const { data, error } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from('wishlists').insert([\n                {\n                    user_id: userId,\n                    item_name: itemName,\n                    description: description || null,\n                    link: link || null\n                }\n            ]).select();\n            if (error) {\n                console.error('Supabase error:', error); // Debug log\n                throw error;\n            }\n            // Clear form\n            setItemName('');\n            setDescription('');\n            setLink('');\n            setSuccess(true);\n            console.log('Item added successfully:', data); // Debug log\n        } catch (error) {\n            setError(error.message || 'An error occurred while adding the item');\n            console.error('Error details:', error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-red-900 max-w-md mx-auto mb-8\",\n        children: [\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4\",\n                children: error\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, this),\n            success && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4\",\n                children: \"Item added successfully!\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 59,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                className: \"space-y-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Item Name\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 65,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: itemName,\n                                onChange: (e)=>setItemName(e.target.value),\n                                className: \"w-full p-2 border rounded\",\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 64,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Description\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                value: description,\n                                onChange: (e)=>setDescription(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"block mb-2\",\n                                children: \"Link\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 83,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"text\",\n                                value: link,\n                                onChange: (e)=>setLink(e.target.value),\n                                className: \"w-full p-2 border rounded\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600\",\n                        children: \"Add Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 91,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, this);\n}\n_s(WishlistForm, \"/8bfwMBOA+2pF2D0DlMtO5s9OPg=\");\n_c = WishlistForm;\nvar _c;\n$RefreshReg$(_c, \"WishlistForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0Rm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVpQztBQUNrQjtBQUNwQyxTQUFTRSxhQUFhLEtBQThCO1FBQTlCLEVBQUVDLE1BQU0sRUFBc0IsR0FBOUI7O0lBQ25DLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNNLGFBQWFDLGVBQWUsR0FBR1AsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUSxNQUFNQyxRQUFRLEdBQUdULCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ1UsT0FBT0MsU0FBUyxHQUFHWCwrQ0FBUUEsQ0FBZ0I7SUFDbEQsTUFBTSxDQUFDWSxTQUFTQyxXQUFXLEdBQUdiLCtDQUFRQSxDQUFDO0lBRXZDLE1BQU1jLGVBQWUsT0FBT0M7UUFDMUJBLEVBQUVDLGNBQWM7UUFDaEJMLFNBQVM7UUFDVEUsV0FBVztRQUVYLElBQUk7WUFDRkksUUFBUUMsR0FBRyxDQUFDLDRCQUE0QmYsU0FBUyxZQUFZO1lBRTdELE1BQU0sRUFBRWdCLElBQUksRUFBRVQsS0FBSyxFQUFFLEdBQUcsTUFBTVQscURBQVFBLENBQ25DbUIsSUFBSSxDQUFDLGFBQ0xDLE1BQU0sQ0FBQztnQkFDTjtvQkFDRUMsU0FBU25CO29CQUNUb0IsV0FBV25CO29CQUNYRSxhQUFhQSxlQUFlO29CQUM1QkUsTUFBTUEsUUFBUTtnQkFDaEI7YUFDRCxFQUNBZ0IsTUFBTTtZQUVULElBQUlkLE9BQU87Z0JBQ1RPLFFBQVFQLEtBQUssQ0FBQyxtQkFBbUJBLFFBQVEsWUFBWTtnQkFDckQsTUFBTUE7WUFDUjtZQUVBLGFBQWE7WUFDYkwsWUFBWTtZQUNaRSxlQUFlO1lBQ2ZFLFFBQVE7WUFDUkksV0FBVztZQUVYSSxRQUFRQyxHQUFHLENBQUMsNEJBQTRCQyxPQUFPLFlBQVk7UUFFN0QsRUFBRSxPQUFPVCxPQUFZO1lBQ25CQyxTQUFTRCxNQUFNZSxPQUFPLElBQUk7WUFDMUJSLFFBQVFQLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2xDO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2dCO1FBQUlDLFdBQVU7O1lBQ1pqQix1QkFDQyw4REFBQ2dCO2dCQUFJQyxXQUFVOzBCQUNaakI7Ozs7OztZQUdKRSx5QkFDQyw4REFBQ2M7Z0JBQUlDLFdBQVU7MEJBQTZFOzs7Ozs7MEJBSTlGLDhEQUFDQztnQkFBS0MsVUFBVWY7Z0JBQWNhLFdBQVU7O2tDQUN0Qyw4REFBQ0Q7OzBDQUNDLDhEQUFDSTtnQ0FBTUgsV0FBVTswQ0FBYTs7Ozs7OzBDQUM5Qiw4REFBQ0k7Z0NBQ0NDLE1BQUs7Z0NBQ0xDLE9BQU83QjtnQ0FDUDhCLFVBQVUsQ0FBQ25CLElBQU1WLFlBQVlVLEVBQUVvQixNQUFNLENBQUNGLEtBQUs7Z0NBQzNDTixXQUFVO2dDQUNWUyxRQUFROzs7Ozs7Ozs7Ozs7a0NBR1osOERBQUNWOzswQ0FDQyw4REFBQ0k7Z0NBQU1ILFdBQVU7MENBQWE7Ozs7OzswQ0FDOUIsOERBQUNVO2dDQUNDSixPQUFPM0I7Z0NBQ1A0QixVQUFVLENBQUNuQixJQUFNUixlQUFlUSxFQUFFb0IsTUFBTSxDQUFDRixLQUFLO2dDQUM5Q04sV0FBVTs7Ozs7Ozs7Ozs7O2tDQUdkLDhEQUFDRDs7MENBQ0MsOERBQUNJO2dDQUFNSCxXQUFVOzBDQUFhOzs7Ozs7MENBQzlCLDhEQUFDSTtnQ0FDQ0MsTUFBSztnQ0FDTEMsT0FBT3pCO2dDQUNQMEIsVUFBVSxDQUFDbkIsSUFBTU4sUUFBUU0sRUFBRW9CLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDdkNOLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FHZCw4REFBQ1c7d0JBQ0NOLE1BQUs7d0JBQ0xMLFdBQVU7a0NBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1UO0dBL0Z3QnpCO0tBQUFBIiwic291cmNlcyI6WyIvVXNlcnMvamFzb25wZW5nNy93aXNobGlzdF9hcHAvd2lzaGxpc3Rfb3JnYW5pemVyL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0Rm9ybS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc3VwYWJhc2VcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdpc2hsaXN0Rm9ybSh7IHVzZXJJZCB9OiB7IHVzZXJJZDogc3RyaW5nIH0pIHtcbiAgY29uc3QgW2l0ZW1OYW1lLCBzZXRJdGVtTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbGluaywgc2V0TGlua10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKG51bGwpO1xuICAgIHNldFN1Y2Nlc3MoZmFsc2UpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZyB3aXRoIHVzZXIgSUQ6XCIsIHVzZXJJZCk7IC8vIERlYnVnIGxvZ1xuXG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAuZnJvbSgnd2lzaGxpc3RzJylcbiAgICAgICAgLmluc2VydChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgICAgICAgaXRlbV9uYW1lOiBpdGVtTmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBudWxsLCAvLyBIYW5kbGUgZW1wdHkgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGxpbms6IGxpbmsgfHwgbnVsbCwgLy8gSGFuZGxlIGVtcHR5IGxpbmtcbiAgICAgICAgICB9XG4gICAgICAgIF0pXG4gICAgICAgIC5zZWxlY3QoKTtcblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1N1cGFiYXNlIGVycm9yOicsIGVycm9yKTsgLy8gRGVidWcgbG9nXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGVhciBmb3JtXG4gICAgICBzZXRJdGVtTmFtZSgnJyk7XG4gICAgICBzZXREZXNjcmlwdGlvbignJyk7XG4gICAgICBzZXRMaW5rKCcnKTtcbiAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdJdGVtIGFkZGVkIHN1Y2Nlc3NmdWxseTonLCBkYXRhKTsgLy8gRGVidWcgbG9nXG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBzZXRFcnJvcihlcnJvci5tZXNzYWdlIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgdGhlIGl0ZW0nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRldGFpbHM6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTkwMCBtYXgtdy1tZCBteC1hdXRvIG1iLThcIj5cbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTEwMCBib3JkZXIgYm9yZGVyLXJlZC00MDAgdGV4dC1yZWQtNzAwIHB4LTQgcHktMyByb3VuZGVkIG1iLTRcIj5cbiAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzdWNjZXNzICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmVlbi0xMDAgYm9yZGVyIGJvcmRlci1ncmVlbi00MDAgdGV4dC1ncmVlbi03MDAgcHgtNCBweS0zIHJvdW5kZWQgbWItNFwiPlxuICAgICAgICAgIEl0ZW0gYWRkZWQgc3VjY2Vzc2Z1bGx5IVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgbWItMlwiPkl0ZW0gTmFtZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17aXRlbU5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEl0ZW1OYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYm9yZGVyIHJvdW5kZWRcIlxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgbWItMlwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIHZhbHVlPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RGVzY3JpcHRpb24oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHAtMiBib3JkZXIgcm91bmRlZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIG1iLTJcIj5MaW5rPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtsaW5rfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRMaW5rKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYm9yZGVyIHJvdW5kZWRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcC0yIHJvdW5kZWQgaG92ZXI6YmctYmx1ZS02MDBcIlxuICAgICAgICA+XG4gICAgICAgICAgQWRkIEl0ZW1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwic3VwYWJhc2UiLCJXaXNobGlzdEZvcm0iLCJ1c2VySWQiLCJpdGVtTmFtZSIsInNldEl0ZW1OYW1lIiwiZGVzY3JpcHRpb24iLCJzZXREZXNjcmlwdGlvbiIsImxpbmsiLCJzZXRMaW5rIiwiZXJyb3IiLCJzZXRFcnJvciIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJmcm9tIiwiaW5zZXJ0IiwidXNlcl9pZCIsIml0ZW1fbmFtZSIsInNlbGVjdCIsIm1lc3NhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJmb3JtIiwib25TdWJtaXQiLCJsYWJlbCIsImlucHV0IiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJyZXF1aXJlZCIsInRleHRhcmVhIiwiYnV0dG9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/WishListForm.tsx\n"));

/***/ })

});