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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WishlistForm)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/supabase */ \"(app-pages-browser)/./utils/supabase.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction WishlistForm(param) {\n    let { userId } = param;\n    _s();\n    const [itemName, setItemName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [description, setDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [link, setLink] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [storeName, setStoreName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setError(null);\n        setSuccess(false);\n        try {\n            console.log(\"Submitting with user ID:\", userId); // Debug log\n            const { data, error } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.from('wishlists').insert([\n                {\n                    user_id: userId,\n                    item_name: itemName,\n                    store: storeName || null,\n                    description: description || null,\n                    link: link || null\n                }\n            ]).select();\n            if (error) {\n                console.error('Supabase error:', error); // Debug log\n                throw error;\n            }\n            // Clear form\n            setItemName('');\n            setDescription('');\n            setStoreName('');\n            setLink('');\n            setSuccess(true);\n            console.log('Item added successfully:', data); // Debug log\n        } catch (error) {\n            setError(error.message || 'An error occurred while adding the item');\n            console.error('Error details:', error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"minw-lg mt-[100px] mx-[100px]\",\n        children: [\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4\",\n                children: error\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 57,\n                columnNumber: 9\n            }, this),\n            success && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4\",\n                children: \"Item added successfully! Refresh to see your updated list!\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 62,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: handleSubmit,\n                className: \"space-y-4 \",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"font-raleway\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"text-primary_text block mb-2 \",\n                                children: [\n                                    \"Item Name\",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"text-red-600\",\n                                        children: \"*\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                        lineNumber: 68,\n                                        columnNumber: 69\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 68,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                placeholder: \"e.g. Socks\",\n                                type: \"text\",\n                                value: itemName,\n                                onChange: (e)=>setItemName(e.target.value),\n                                className: \"w-full p-2 bg-primary_text rounded bg text-dark_gray\",\n                                required: true\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 69,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 67,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"font-raleway\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"text-primary_text block mb-2\",\n                                children: \"Brand/Store\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 79,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                placeholder: \"e.g. Nike\",\n                                type: \"text\",\n                                value: storeName,\n                                onChange: (e)=>setStoreName(e.target.value),\n                                className: \"w-full p-2 bg-primary_text rounded text-dark_gray\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 80,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"font-raleway\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"text-primary_text block mb-2\",\n                                children: \"Description\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 89,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                                placeholder: \"e.g. size, color, etc.\",\n                                value: description,\n                                onChange: (e)=>setDescription(e.target.value),\n                                className: \"w-full p-2 bg-primary_text rounded text-dark_gray\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 90,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"font-raleway\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: \"text-primary_text block mb-2\",\n                                children: \"Link\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 98,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                placeholder: \"e.g. https://nike.com/store\",\n                                type: \"text\",\n                                value: link,\n                                onChange: (e)=>setLink(e.target.value),\n                                className: \"w-full p-2 bg-primary_text rounded text-dark_gray\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                                lineNumber: 99,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 97,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"font-raleway w-full bg-washed_gray text-white p-2 rounded\",\n                        children: \"Add Item\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                        lineNumber: 107,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/dashboard/WishListForm.tsx\",\n        lineNumber: 55,\n        columnNumber: 5\n    }, this);\n}\n_s(WishlistForm, \"IjBjy+1As1pgOuzyHaHAXBtsDbs=\");\n_c = WishlistForm;\nvar _c;\n$RefreshReg$(_c, \"WishlistForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1dpc2hMaXN0Rm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVpQztBQUNrQjtBQUNwQyxTQUFTRSxhQUFhLEtBQThCO1FBQTlCLEVBQUVDLE1BQU0sRUFBc0IsR0FBOUI7O0lBQ25DLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNNLGFBQWFDLGVBQWUsR0FBR1AsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUSxNQUFNQyxRQUFRLEdBQUdULCtDQUFRQSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQ1UsV0FBV0MsYUFBYSxHQUFHWCwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNZLE9BQU9DLFNBQVMsR0FBR2IsK0NBQVFBLENBQWdCO0lBQ2xELE1BQU0sQ0FBQ2MsU0FBU0MsV0FBVyxHQUFHZiwrQ0FBUUEsQ0FBQztJQUV2QyxNQUFNZ0IsZUFBZSxPQUFPQztRQUMxQkEsRUFBRUMsY0FBYztRQUNoQkwsU0FBUztRQUNURSxXQUFXO1FBRVgsSUFBSTtZQUNGSSxRQUFRQyxHQUFHLENBQUMsNEJBQTRCakIsU0FBUyxZQUFZO1lBRTdELE1BQU0sRUFBRWtCLElBQUksRUFBRVQsS0FBSyxFQUFFLEdBQUcsTUFBTVgscURBQVFBLENBQ25DcUIsSUFBSSxDQUFDLGFBQ0xDLE1BQU0sQ0FBQztnQkFDTjtvQkFDRUMsU0FBU3JCO29CQUNUc0IsV0FBV3JCO29CQUNYc0IsT0FBT2hCLGFBQWE7b0JBQ3BCSixhQUFhQSxlQUFlO29CQUM1QkUsTUFBTUEsUUFBUTtnQkFDaEI7YUFDRCxFQUNBbUIsTUFBTTtZQUVULElBQUlmLE9BQU87Z0JBQ1RPLFFBQVFQLEtBQUssQ0FBQyxtQkFBbUJBLFFBQVEsWUFBWTtnQkFDckQsTUFBTUE7WUFDUjtZQUVBLGFBQWE7WUFDYlAsWUFBWTtZQUNaRSxlQUFlO1lBQ2ZJLGFBQWE7WUFDYkYsUUFBUTtZQUNSTSxXQUFXO1lBRVhJLFFBQVFDLEdBQUcsQ0FBQyw0QkFBNEJDLE9BQU8sWUFBWTtRQUU3RCxFQUFFLE9BQU9ULE9BQVk7WUFDbkJDLFNBQVNELE1BQU1nQixPQUFPLElBQUk7WUFDMUJULFFBQVFQLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2xDO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ2lCO1FBQUlDLFdBQVU7O1lBQ1psQix1QkFDQyw4REFBQ2lCO2dCQUFJQyxXQUFVOzBCQUNabEI7Ozs7OztZQUdKRSx5QkFDQyw4REFBQ2U7Z0JBQUlDLFdBQVU7MEJBQTZFOzs7Ozs7MEJBSTlGLDhEQUFDQztnQkFBS0MsVUFBVWhCO2dCQUFjYyxXQUFVOztrQ0FDdEMsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ0c7Z0NBQU1ILFdBQVU7O29DQUFnQztrREFBUyw4REFBQ0k7d0NBQUtKLFdBQVU7a0RBQWU7Ozs7Ozs7Ozs7OzswQ0FDekYsOERBQUNLO2dDQUNDQyxhQUFZO2dDQUNaQyxNQUFLO2dDQUNMQyxPQUFPbEM7Z0NBQ1BtQyxVQUFVLENBQUN0QixJQUFNWixZQUFZWSxFQUFFdUIsTUFBTSxDQUFDRixLQUFLO2dDQUMzQ1IsV0FBVTtnQ0FDVlcsUUFBUTs7Ozs7Ozs7Ozs7O2tDQUdaLDhEQUFDWjt3QkFBSUMsV0FBVTs7MENBQ2IsOERBQUNHO2dDQUFNSCxXQUFVOzBDQUErQjs7Ozs7OzBDQUNoRCw4REFBQ0s7Z0NBQ0NDLGFBQVk7Z0NBQ1pDLE1BQUs7Z0NBQ0xDLE9BQU81QjtnQ0FDUDZCLFVBQVUsQ0FBQ3RCLElBQU1OLGFBQWFNLEVBQUV1QixNQUFNLENBQUNGLEtBQUs7Z0NBQzVDUixXQUFVOzs7Ozs7Ozs7Ozs7a0NBR2QsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ0c7Z0NBQU1ILFdBQVU7MENBQStCOzs7Ozs7MENBQ2hELDhEQUFDWTtnQ0FDQ04sYUFBWTtnQ0FDWkUsT0FBT2hDO2dDQUNQaUMsVUFBVSxDQUFDdEIsSUFBTVYsZUFBZVUsRUFBRXVCLE1BQU0sQ0FBQ0YsS0FBSztnQ0FDOUNSLFdBQVU7Ozs7Ozs7Ozs7OztrQ0FHZCw4REFBQ0Q7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDRztnQ0FBTUgsV0FBVTswQ0FBK0I7Ozs7OzswQ0FDaEQsOERBQUNLO2dDQUNDQyxhQUFZO2dDQUNaQyxNQUFLO2dDQUNMQyxPQUFPOUI7Z0NBQ1ArQixVQUFVLENBQUN0QixJQUFNUixRQUFRUSxFQUFFdUIsTUFBTSxDQUFDRixLQUFLO2dDQUN2Q1IsV0FBVTs7Ozs7Ozs7Ozs7O2tDQUdkLDhEQUFDYTt3QkFDQ04sTUFBSzt3QkFDTFAsV0FBVTtrQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVQ7R0EvR3dCNUI7S0FBQUEiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYXNvbnBlbmc3L3dpc2hsaXN0X2FwcC93aXNobGlzdF9vcmdhbml6ZXIvc3JjL2FwcC9kYXNoYm9hcmQvV2lzaExpc3RGb3JtLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdXBhYmFzZVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2lzaGxpc3RGb3JtKHsgdXNlcklkIH06IHsgdXNlcklkOiBzdHJpbmcgfSkge1xuICBjb25zdCBbaXRlbU5hbWUsIHNldEl0ZW1OYW1lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2Rlc2NyaXB0aW9uLCBzZXREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtsaW5rLCBzZXRMaW5rXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3N0b3JlTmFtZSwgc2V0U3RvcmVOYW1lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0RXJyb3IobnVsbCk7XG4gICAgc2V0U3VjY2VzcyhmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nIHdpdGggdXNlciBJRDpcIiwgdXNlcklkKTsgLy8gRGVidWcgbG9nXG5cbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgIC5mcm9tKCd3aXNobGlzdHMnKVxuICAgICAgICAuaW5zZXJ0KFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICBpdGVtX25hbWU6IGl0ZW1OYW1lLFxuICAgICAgICAgICAgc3RvcmU6IHN0b3JlTmFtZSB8fCBudWxsLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IG51bGwsIC8vIEhhbmRsZSBlbXB0eSBkZXNjcmlwdGlvblxuICAgICAgICAgICAgbGluazogbGluayB8fCBudWxsLCAvLyBIYW5kbGUgZW1wdHkgbGlua1xuICAgICAgICAgIH1cbiAgICAgICAgXSlcbiAgICAgICAgLnNlbGVjdCgpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignU3VwYWJhc2UgZXJyb3I6JywgZXJyb3IpOyAvLyBEZWJ1ZyBsb2dcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIC8vIENsZWFyIGZvcm1cbiAgICAgIHNldEl0ZW1OYW1lKCcnKTtcbiAgICAgIHNldERlc2NyaXB0aW9uKCcnKTtcbiAgICAgIHNldFN0b3JlTmFtZSgnJyk7XG4gICAgICBzZXRMaW5rKCcnKTtcbiAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdJdGVtIGFkZGVkIHN1Y2Nlc3NmdWxseTonLCBkYXRhKTsgLy8gRGVidWcgbG9nXG5cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBzZXRFcnJvcihlcnJvci5tZXNzYWdlIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgdGhlIGl0ZW0nKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRldGFpbHM6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWludy1sZyBtdC1bMTAwcHhdIG14LVsxMDBweF1cIj5cbiAgICAgIHtlcnJvciAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTEwMCBib3JkZXIgYm9yZGVyLXJlZC00MDAgdGV4dC1yZWQtNzAwIHB4LTQgcHktMyByb3VuZGVkIG1iLTRcIj5cbiAgICAgICAgICB7ZXJyb3J9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzdWNjZXNzICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmVlbi0xMDAgYm9yZGVyIGJvcmRlci1ncmVlbi00MDAgdGV4dC1ncmVlbi03MDAgcHgtNCBweS0zIHJvdW5kZWQgbWItNFwiPlxuICAgICAgICAgIEl0ZW0gYWRkZWQgc3VjY2Vzc2Z1bGx5ISBSZWZyZXNoIHRvIHNlZSB5b3VyIHVwZGF0ZWQgbGlzdCFcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS00IFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtcmFsZXdheVwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnlfdGV4dCBibG9jayBtYi0yIFwiPkl0ZW0gTmFtZTxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTYwMFwiPio8L3NwYW4+PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBTb2Nrc1wiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17aXRlbU5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEl0ZW1OYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYmctcHJpbWFyeV90ZXh0IHJvdW5kZWQgYmcgdGV4dC1kYXJrX2dyYXlcIlxuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXJhbGV3YXlcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5X3RleHQgYmxvY2sgbWItMlwiPkJyYW5kL1N0b3JlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBOaWtlXCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtzdG9yZU5hbWV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFN0b3JlTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJnLXByaW1hcnlfdGV4dCByb3VuZGVkIHRleHQtZGFya19ncmF5XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXJhbGV3YXlcIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5X3RleHQgYmxvY2sgbWItMlwiPkRlc2NyaXB0aW9uPC9sYWJlbD5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBzaXplLCBjb2xvciwgZXRjLlwiXG4gICAgICAgICAgICB2YWx1ZT17ZGVzY3JpcHRpb259XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldERlc2NyaXB0aW9uKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYmctcHJpbWFyeV90ZXh0IHJvdW5kZWQgdGV4dC1kYXJrX2dyYXlcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtcmFsZXdheVwiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnlfdGV4dCBibG9jayBtYi0yXCI+TGluazwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gaHR0cHM6Ly9uaWtlLmNvbS9zdG9yZVwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17bGlua31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TGluayhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJnLXByaW1hcnlfdGV4dCByb3VuZGVkIHRleHQtZGFya19ncmF5XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtcmFsZXdheSB3LWZ1bGwgYmctd2FzaGVkX2dyYXkgdGV4dC13aGl0ZSBwLTIgcm91bmRlZFwiXG4gICAgICAgID5cbiAgICAgICAgICBBZGQgSXRlbVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJzdXBhYmFzZSIsIldpc2hsaXN0Rm9ybSIsInVzZXJJZCIsIml0ZW1OYW1lIiwic2V0SXRlbU5hbWUiLCJkZXNjcmlwdGlvbiIsInNldERlc2NyaXB0aW9uIiwibGluayIsInNldExpbmsiLCJzdG9yZU5hbWUiLCJzZXRTdG9yZU5hbWUiLCJlcnJvciIsInNldEVycm9yIiwic3VjY2VzcyIsInNldFN1Y2Nlc3MiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImZyb20iLCJpbnNlcnQiLCJ1c2VyX2lkIiwiaXRlbV9uYW1lIiwic3RvcmUiLCJzZWxlY3QiLCJtZXNzYWdlIiwiZGl2IiwiY2xhc3NOYW1lIiwiZm9ybSIsIm9uU3VibWl0IiwibGFiZWwiLCJzcGFuIiwiaW5wdXQiLCJwbGFjZWhvbGRlciIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicmVxdWlyZWQiLCJ0ZXh0YXJlYSIsImJ1dHRvbiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/WishListForm.tsx\n"));

/***/ })

});