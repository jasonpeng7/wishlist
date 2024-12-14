"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/MiscCards.tsx":
/*!*******************************!*\
  !*** ./src/app/MiscCards.tsx ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MiscCards)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// MiscCards.tsx\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\nconst MiscCard = (param)=>{\n    let { opacity } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"text-primary_text font-raleway flex flex-col rounded-md bg-dark_gray w-full p-[10px] gap-y-[5px]\",\n        style: {\n            opacity\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-s\",\n                children: \"Misc\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n                lineNumber: 12,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"text-[10px]\",\n                children: \"Brand/Store\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n                lineNumber: 13,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"text-[10px]\",\n                children: \"Describe it!\"\n            }, void 0, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n                lineNumber: 14,\n                columnNumber: 5\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n        lineNumber: 10,\n        columnNumber: 3\n    }, undefined);\n};\n_c = MiscCard;\nconst useCardCount = ()=>{\n    _s();\n    const [cardCount, setCardCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(9);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"useCardCount.useEffect\": ()=>{\n            const calculateCardCount = {\n                \"useCardCount.useEffect.calculateCardCount\": ()=>{\n                    const screenHeight = window.innerHeight;\n                    const cardHeight = 100;\n                    const visibleCards = Math.floor(screenHeight / cardHeight);\n                    setCardCount(visibleCards + 4);\n                }\n            }[\"useCardCount.useEffect.calculateCardCount\"];\n            calculateCardCount();\n            window.addEventListener('resize', calculateCardCount);\n            return ({\n                \"useCardCount.useEffect\": ()=>window.removeEventListener('resize', calculateCardCount)\n            })[\"useCardCount.useEffect\"];\n        }\n    }[\"useCardCount.useEffect\"], []);\n    return cardCount;\n};\n_s(useCardCount, \"eG7ndS7+AbNOD6zyAQ3J3aJg46w=\");\nfunction MiscCards() {\n    _s1();\n    const cardCount = useCardCount();\n    const generateCards = (count)=>{\n        const cards = [];\n        const midPoint = Math.floor(count / 2);\n        for(let i = 0; i < count; i++){\n            const distanceFromMiddle = Math.abs(i - midPoint);\n            const maxDistance = midPoint;\n            const opacity = 1 - distanceFromMiddle / maxDistance * 0.6;\n            cards.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(MiscCard, {\n                opacity: opacity\n            }, i, false, {\n                fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n                lineNumber: 50,\n                columnNumber: 9\n            }, this));\n        }\n        return cards;\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col bg-washed_gray w-1/3 h-screen overflow-hidden\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-col gap-y-[26px] h-full overflow-y-auto\",\n            children: generateCards(cardCount)\n        }, void 0, false, {\n            fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n            lineNumber: 58,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/jasonpeng7/wishlist_app/wishlist_organizer/src/app/MiscCards.tsx\",\n        lineNumber: 57,\n        columnNumber: 5\n    }, this);\n}\n_s1(MiscCards, \"kuLgHYlzFLAqujMs9HGTxjQbnbQ=\", false, function() {\n    return [\n        useCardCount\n    ];\n});\n_c1 = MiscCards;\nvar _c, _c1;\n$RefreshReg$(_c, \"MiscCard\");\n$RefreshReg$(_c1, \"MiscCards\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvTWlzY0NhcmRzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsZ0JBQWdCOzs7QUFFMEM7QUFNMUQsTUFBTUUsV0FBVztRQUFDLEVBQUVDLE9BQU8sRUFBaUI7eUJBQzFDLDhEQUFDQztRQUFJQyxXQUFZO1FBQ1pDLE9BQU87WUFBRUg7UUFBUTs7MEJBQ3BCLDhEQUFDSTtnQkFBR0YsV0FBVTswQkFBUzs7Ozs7OzBCQUN2Qiw4REFBQ0c7Z0JBQUVILFdBQVU7MEJBQWM7Ozs7OzswQkFDM0IsOERBQUNHO2dCQUFFSCxXQUFVOzBCQUFjOzs7Ozs7Ozs7Ozs7O0tBTHpCSDtBQVNOLE1BQU1PLGVBQWU7O0lBQ25CLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHWCwrQ0FBUUEsQ0FBUztJQUVuREMsZ0RBQVNBO2tDQUFDO1lBQ1IsTUFBTVc7NkRBQXFCO29CQUN6QixNQUFNQyxlQUFlQyxPQUFPQyxXQUFXO29CQUN2QyxNQUFNQyxhQUFhO29CQUNuQixNQUFNQyxlQUFlQyxLQUFLQyxLQUFLLENBQUNOLGVBQWVHO29CQUMvQ0wsYUFBYU0sZUFBZTtnQkFDOUI7O1lBRUFMO1lBQ0FFLE9BQU9NLGdCQUFnQixDQUFDLFVBQVVSO1lBQ2xDOzBDQUFPLElBQU1FLE9BQU9PLG1CQUFtQixDQUFDLFVBQVVUOztRQUNwRDtpQ0FBRyxFQUFFO0lBRUwsT0FBT0Y7QUFDVDtHQWpCTUQ7QUFtQlMsU0FBU2E7O0lBQ3RCLE1BQU1aLFlBQVlEO0lBRWxCLE1BQU1jLGdCQUFnQixDQUFDQztRQUNyQixNQUFNQyxRQUF3QixFQUFFO1FBQ2hDLE1BQU1DLFdBQVdSLEtBQUtDLEtBQUssQ0FBQ0ssUUFBUTtRQUVwQyxJQUFLLElBQUlHLElBQUksR0FBR0EsSUFBSUgsT0FBT0csSUFBSztZQUM5QixNQUFNQyxxQkFBcUJWLEtBQUtXLEdBQUcsQ0FBQ0YsSUFBSUQ7WUFDeEMsTUFBTUksY0FBY0o7WUFDcEIsTUFBTXZCLFVBQVUsSUFBS3lCLHFCQUFxQkUsY0FBYztZQUV4REwsTUFBTU0sSUFBSSxlQUNSLDhEQUFDN0I7Z0JBQWlCQyxTQUFTQTtlQUFad0I7Ozs7O1FBRW5CO1FBQ0EsT0FBT0Y7SUFDVDtJQUVBLHFCQUNFLDhEQUFDckI7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0Q7WUFBSUMsV0FBVTtzQkFDWmtCLGNBQWNiOzs7Ozs7Ozs7OztBQUl2QjtJQTFCd0JZOztRQUNKYjs7O01BRElhIiwic291cmNlcyI6WyIvVXNlcnMvamFzb25wZW5nNy93aXNobGlzdF9hcHAvd2lzaGxpc3Rfb3JnYW5pemVyL3NyYy9hcHAvTWlzY0NhcmRzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNaXNjQ2FyZHMudHN4XG4ndXNlIGNsaWVudCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBNaXNjQ2FyZFByb3BzIHtcbiAgb3BhY2l0eTogbnVtYmVyO1xufVxuXG5jb25zdCBNaXNjQ2FyZCA9ICh7IG9wYWNpdHkgfTogTWlzY0NhcmRQcm9wcyk6IFJlYWN0RWxlbWVudCA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC1wcmltYXJ5X3RleHQgZm9udC1yYWxld2F5IGZsZXggZmxleC1jb2wgcm91bmRlZC1tZCBiZy1kYXJrX2dyYXkgdy1mdWxsIHAtWzEwcHhdIGdhcC15LVs1cHhdYH0gXG4gICAgICAgc3R5bGU9e3sgb3BhY2l0eSB9fT5cbiAgICA8aDEgY2xhc3NOYW1lPSd0ZXh0LXMnPk1pc2M8L2gxPlxuICAgIDxwIGNsYXNzTmFtZT0ndGV4dC1bMTBweF0nPkJyYW5kL1N0b3JlPC9wPlxuICAgIDxwIGNsYXNzTmFtZT0ndGV4dC1bMTBweF0nPkRlc2NyaWJlIGl0ITwvcD5cbiAgPC9kaXY+XG4pO1xuXG5jb25zdCB1c2VDYXJkQ291bnQgPSAoKTogbnVtYmVyID0+IHtcbiAgY29uc3QgW2NhcmRDb3VudCwgc2V0Q2FyZENvdW50XSA9IHVzZVN0YXRlPG51bWJlcj4oOSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYWxjdWxhdGVDYXJkQ291bnQgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBjb25zdCBjYXJkSGVpZ2h0ID0gMTAwO1xuICAgICAgY29uc3QgdmlzaWJsZUNhcmRzID0gTWF0aC5mbG9vcihzY3JlZW5IZWlnaHQgLyBjYXJkSGVpZ2h0KTtcbiAgICAgIHNldENhcmRDb3VudCh2aXNpYmxlQ2FyZHMgKyA0KTtcbiAgICB9O1xuXG4gICAgY2FsY3VsYXRlQ2FyZENvdW50KCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbGN1bGF0ZUNhcmRDb3VudCk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjYWxjdWxhdGVDYXJkQ291bnQpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGNhcmRDb3VudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1pc2NDYXJkcygpOiBSZWFjdEVsZW1lbnQge1xuICBjb25zdCBjYXJkQ291bnQgPSB1c2VDYXJkQ291bnQoKTtcblxuICBjb25zdCBnZW5lcmF0ZUNhcmRzID0gKGNvdW50OiBudW1iZXIpOiBSZWFjdEVsZW1lbnRbXSA9PiB7XG4gICAgY29uc3QgY2FyZHM6IFJlYWN0RWxlbWVudFtdID0gW107XG4gICAgY29uc3QgbWlkUG9pbnQgPSBNYXRoLmZsb29yKGNvdW50IC8gMik7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBkaXN0YW5jZUZyb21NaWRkbGUgPSBNYXRoLmFicyhpIC0gbWlkUG9pbnQpO1xuICAgICAgY29uc3QgbWF4RGlzdGFuY2UgPSBtaWRQb2ludDtcbiAgICAgIGNvbnN0IG9wYWNpdHkgPSAxIC0gKGRpc3RhbmNlRnJvbU1pZGRsZSAvIG1heERpc3RhbmNlICogMC42KTtcbiAgICAgIFxuICAgICAgY2FyZHMucHVzaChcbiAgICAgICAgPE1pc2NDYXJkIGtleT17aX0gb3BhY2l0eT17b3BhY2l0eX0gLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIGJnLXdhc2hlZF9ncmF5IHctMS8zIGgtc2NyZWVuIG92ZXJmbG93LWhpZGRlbic+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LWNvbCBnYXAteS1bMjZweF0gaC1mdWxsIG92ZXJmbG93LXktYXV0byc+XG4gICAgICAgIHtnZW5lcmF0ZUNhcmRzKGNhcmRDb3VudCl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJNaXNjQ2FyZCIsIm9wYWNpdHkiLCJkaXYiLCJjbGFzc05hbWUiLCJzdHlsZSIsImgxIiwicCIsInVzZUNhcmRDb3VudCIsImNhcmRDb3VudCIsInNldENhcmRDb3VudCIsImNhbGN1bGF0ZUNhcmRDb3VudCIsInNjcmVlbkhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiY2FyZEhlaWdodCIsInZpc2libGVDYXJkcyIsIk1hdGgiLCJmbG9vciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiTWlzY0NhcmRzIiwiZ2VuZXJhdGVDYXJkcyIsImNvdW50IiwiY2FyZHMiLCJtaWRQb2ludCIsImkiLCJkaXN0YW5jZUZyb21NaWRkbGUiLCJhYnMiLCJtYXhEaXN0YW5jZSIsInB1c2giXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/MiscCards.tsx\n"));

/***/ })

});