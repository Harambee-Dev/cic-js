/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
window.cic =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/bancor/abi/contract_registry.json":
/*!************************************************!*\
  !*** ./dist/bancor/abi/contract_registry.json ***!
  \************************************************/
/*! default exports */
/*! export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export constant [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export inputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export outputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export stateMutability [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = JSON.parse(\"[{\\\"inputs\\\":[{\\\"internalType\\\":\\\"bytes32\\\",\\\"name\\\":\\\"_contractName\\\",\\\"type\\\":\\\"bytes32\\\"}],\\\"name\\\":\\\"getAddress\\\",\\\"outputs\\\":[{\\\"internalType\\\":\\\"address\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"address\\\"}],\\\"stateMutability\\\":\\\"view\\\",\\\"type\\\":\\\"function\\\",\\\"constant\\\":true}]\");\n\n//# sourceURL=webpack://cic/./dist/bancor/abi/contract_registry.json?");

/***/ }),

/***/ "./dist/bancor/abi/converter_registry.json":
/*!*************************************************!*\
  !*** ./dist/bancor/abi/converter_registry.json ***!
  \*************************************************/
/*! default exports */
/*! export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export constant [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export inputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     exports [not provided] [no usage info] */
/*!   export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export outputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export stateMutability [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = JSON.parse(\"[{\\\"inputs\\\":[],\\\"name\\\":\\\"getConvertibleTokens\\\",\\\"outputs\\\":[{\\\"internalType\\\":\\\"address[]\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"address[]\\\"}],\\\"stateMutability\\\":\\\"view\\\",\\\"type\\\":\\\"function\\\",\\\"constant\\\":true}]\");\n\n//# sourceURL=webpack://cic/./dist/bancor/abi/converter_registry.json?");

/***/ }),

/***/ "./dist/bancor/abi/index.js":
/*!**********************************!*\
  !*** ./dist/bancor/abi/index.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/*! CommonJS bailout: this is used directly at 9:26-30 */
/*! CommonJS bailout: this is used directly at 14:20-24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.abi = void 0;\nvar networkAbi = __importStar(__webpack_require__(/*! ./network.json */ \"./dist/bancor/abi/network.json\"));\nvar contractRegistryAbi = __importStar(__webpack_require__(/*! ./contract_registry.json */ \"./dist/bancor/abi/contract_registry.json\"));\nvar converterRegistryAbi = __importStar(__webpack_require__(/*! ./converter_registry.json */ \"./dist/bancor/abi/converter_registry.json\"));\nvar abi = {\n    'network': networkAbi['default'],\n    'contract_registry': contractRegistryAbi['default'],\n    'converter_registry': converterRegistryAbi['default'],\n};\nexports.abi = abi;\n\n\n//# sourceURL=webpack://cic/./dist/bancor/abi/index.js?");

/***/ }),

/***/ "./dist/bancor/abi/network.json":
/*!**************************************!*\
  !*** ./dist/bancor/abi/network.json ***!
  \**************************************/
/*! default exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = [];\n\n//# sourceURL=webpack://cic/./dist/bancor/abi/network.json?");

/***/ }),

/***/ "./dist/bancor/convert.js":
/*!********************************!*\
  !*** ./dist/bancor/convert.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 11:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Conversion = void 0;\nvar tx_1 = __webpack_require__(/*! ../common/tx */ \"./dist/common/tx.js\");\nvar topic_convert = '0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095';\nvar Conversion = /** @class */ (function () {\n    function Conversion(tx, sourceToken, destinationToken, trader, fromValue, toValue) {\n        this.sourceToken = sourceToken;\n        this.destinationToken = destinationToken;\n        this.trader = trader;\n        this.fromValue = fromValue;\n        this.toValue = toValue;\n        this.tx = tx;\n    }\n    Conversion.processLog = function (w3, registry, success, log) {\n        return __awaiter(this, void 0, void 0, function () {\n            var conversion, block, sourceToken_address, sourceToken, destinationToken_address, destinationToken, fromValue, toValue, trader, tx;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        conversion = undefined;\n                        if (!(log.topics[0] == topic_convert)) return [3 /*break*/, 2];\n                        return [4 /*yield*/, w3.eth.getBlock(log.blockNumber)];\n                    case 1:\n                        block = _a.sent();\n                        sourceToken_address = w3.utils.toChecksumAddress('0x' + log.topics[1].substring(26, 66));\n                        sourceToken = registry.tokens_r[sourceToken_address];\n                        destinationToken_address = w3.utils.toChecksumAddress('0x' + log.topics[2].substring(26, 66));\n                        destinationToken = registry.tokens_r[destinationToken_address];\n                        fromValue = BigInt(log.data.substring(0, 66));\n                        toValue = BigInt(log.data.substring(0, 66));\n                        trader = w3.utils.toChecksumAddress('0x' + log.data.substring(154));\n                        tx = new tx_1.Tx(log.blockNumber, log.transactionIndex, log.transactionHash, block.timestamp, success);\n                        conversion = new Conversion(tx, sourceToken, destinationToken, trader, fromValue, toValue);\n                        console.log('convert', conversion);\n                        _a.label = 2;\n                    case 2: return [2 /*return*/, conversion];\n                }\n            });\n        });\n    };\n    return Conversion;\n}());\nexports.Conversion = Conversion;\n\n\n//# sourceURL=webpack://cic/./dist/bancor/convert.js?");

/***/ }),

/***/ "./dist/common/abi/erc20.json":
/*!************************************!*\
  !*** ./dist/common/abi/erc20.json ***!
  \************************************/
/*! default exports */
/*! export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export constant [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export inputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export outputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export stateMutability [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 1 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export constant [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export inputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     exports [not provided] [no usage info] */
/*!   export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export outputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export stateMutability [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 2 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export constant [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export inputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     exports [not provided] [no usage info] */
/*!   export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export outputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export stateMutability [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export 3 [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export constant [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export inputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     exports [not provided] [no usage info] */
/*!   export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export outputs [provided] [no usage info] [missing usage info prevents renaming] */
/*!     export 0 [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export internalType [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export name [provided] [no usage info] [missing usage info prevents renaming] */
/*!       export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!       other exports [not provided] [no usage info] */
/*!     other exports [not provided] [no usage info] */
/*!   export stateMutability [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export type [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = JSON.parse(\"[{\\\"inputs\\\":[{\\\"internalType\\\":\\\"address\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"address\\\"}],\\\"name\\\":\\\"balanceOf\\\",\\\"outputs\\\":[{\\\"internalType\\\":\\\"uint256\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"uint256\\\"}],\\\"stateMutability\\\":\\\"view\\\",\\\"type\\\":\\\"function\\\",\\\"constant\\\":true},{\\\"inputs\\\":[],\\\"name\\\":\\\"decimals\\\",\\\"outputs\\\":[{\\\"internalType\\\":\\\"uint8\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"uint8\\\"}],\\\"stateMutability\\\":\\\"view\\\",\\\"type\\\":\\\"function\\\",\\\"constant\\\":true},{\\\"inputs\\\":[],\\\"name\\\":\\\"name\\\",\\\"outputs\\\":[{\\\"internalType\\\":\\\"string\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"string\\\"}],\\\"stateMutability\\\":\\\"view\\\",\\\"type\\\":\\\"function\\\",\\\"constant\\\":true},{\\\"inputs\\\":[],\\\"name\\\":\\\"symbol\\\",\\\"outputs\\\":[{\\\"internalType\\\":\\\"string\\\",\\\"name\\\":\\\"\\\",\\\"type\\\":\\\"string\\\"}],\\\"stateMutability\\\":\\\"view\\\",\\\"type\\\":\\\"function\\\",\\\"constant\\\":true}]\");\n\n//# sourceURL=webpack://cic/./dist/common/abi/erc20.json?");

/***/ }),

/***/ "./dist/common/abi/index.js":
/*!**********************************!*\
  !*** ./dist/common/abi/index.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/*! CommonJS bailout: this is used directly at 9:26-30 */
/*! CommonJS bailout: this is used directly at 14:20-24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.abi = void 0;\nvar erc20Abi = __importStar(__webpack_require__(/*! ./erc20.json */ \"./dist/common/abi/erc20.json\"));\nvar abi = {\n    'erc20': erc20Abi['default'],\n};\nexports.abi = abi;\n\n\n//# sourceURL=webpack://cic/./dist/common/abi/index.js?");

/***/ }),

/***/ "./dist/common/erc20.js":
/*!******************************!*\
  !*** ./dist/common/erc20.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 11:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.topics = exports.Token = exports.Transfer = void 0;\nvar tx_1 = __webpack_require__(/*! ./tx */ \"./dist/common/tx.js\");\nvar topics = {\n    'transfer': '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',\n};\nexports.topics = topics;\nvar Transfer = /** @class */ (function () {\n    function Transfer(tx, token, from, to, value) {\n        this.from = from;\n        this.to = to;\n        this.token = token;\n        this.value = value;\n        this.tx = tx;\n    }\n    Transfer.processLog = function (w3, success, token, log) {\n        return __awaiter(this, void 0, void 0, function () {\n            var transfer, block, from, to, value, tx;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        transfer = undefined;\n                        if (!(log.topics[0] == topics['transfer'])) return [3 /*break*/, 2];\n                        return [4 /*yield*/, w3.eth.getBlock(log.blockNumber)];\n                    case 1:\n                        block = _a.sent();\n                        from = w3.utils.toChecksumAddress(log.topics[1].substring(26, 66));\n                        to = w3.utils.toChecksumAddress(log.topics[2].substring(26, 66));\n                        value = BigInt(log.data);\n                        tx = new tx_1.Tx(log.blockNumber, log.transactionIndex, log.transactionHash, block.timestamp, success);\n                        transfer = new Transfer(tx, token, from, to, value);\n                        _a.label = 2;\n                    case 2: return [2 /*return*/, transfer];\n                }\n            });\n        });\n    };\n    return Transfer;\n}());\nexports.Transfer = Transfer;\nvar Token = /** @class */ (function () {\n    function Token(address, name, symbol) {\n        this.address = address;\n        this.name = name;\n        this.symbol = symbol;\n    }\n    Token.prototype.toString = function () {\n        return 'Token: ' + this.name + ' (' + this.symbol + ')';\n    };\n    return Token;\n}());\nexports.Token = Token;\n\n\n//# sourceURL=webpack://cic/./dist/common/erc20.js?");

/***/ }),

/***/ "./dist/common/tx.js":
/*!***************************!*\
  !*** ./dist/common/tx.js ***!
  \***************************/
/*! flagged exports */
/*! export Log [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Tx [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Log = exports.Tx = void 0;\nvar Tx = /** @class */ (function () {\n    function Tx(block, tx_index, tx_hash, timestamp, success) {\n        this.block = block;\n        this.txIndex = tx_index;\n        this.txHash = tx_hash;\n        this.timestamp = timestamp;\n        this.success = success;\n    }\n    return Tx;\n}());\nexports.Tx = Tx;\nvar Log = /** @class */ (function () {\n    function Log() {\n    }\n    return Log;\n}());\nexports.Log = Log;\n\n\n//# sourceURL=webpack://cic/./dist/common/tx.js?");

/***/ }),

/***/ "./dist/helper.js":
/*!************************!*\
  !*** ./dist/helper.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 11:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TransactionHelper = void 0;\nvar erc20_1 = __webpack_require__(/*! ./common/erc20 */ \"./dist/common/erc20.js\");\nvar convert_1 = __webpack_require__(/*! ./bancor/convert */ \"./dist/bancor/convert.js\");\n// TODO: Is there a way of importing the web3 type instead?\nvar Receipt = /** @class */ (function () {\n    function Receipt() {\n    }\n    return Receipt;\n}());\nvar TransactionHelper = /** @class */ (function () {\n    function TransactionHelper(registry) {\n        this.w3 = registry.w3;\n        this.registry = registry;\n        this.ontransfer = function (t) {\n            console.debug('transfer ', t);\n        };\n        this.onconversion = function (c) {\n            console.debug('convert ', c);\n        };\n    }\n    TransactionHelper.prototype.processReceipt = function (r) {\n        return __awaiter(this, void 0, void 0, function () {\n            var self, logs, convert_log, token_txs, i, contract_address, t, conversion;\n            var _this = this;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        self = this;\n                        logs = r.logs;\n                        convert_log = undefined;\n                        token_txs = [];\n                        for (i = 0; i < logs.length; i++) {\n                            contract_address = logs[i].address;\n                            if (this.registry.contracts_r[contract_address] !== undefined) {\n                                convert_log = logs[i];\n                                console.debug('found bancornetwork tx');\n                                break;\n                            }\n                            else {\n                                t = this.registry.tokens_r[contract_address];\n                                if (t !== undefined) { // need to check arg on\n                                    token_txs.push([r.status, t, logs[i]]);\n                                }\n                            }\n                        }\n                        if (!(convert_log !== undefined)) return [3 /*break*/, 2];\n                        return [4 /*yield*/, convert_1.Conversion.processLog(this.w3, this.registry, r.status, convert_log)];\n                    case 1:\n                        conversion = _a.sent();\n                        if (conversion !== undefined) {\n                            this.onconversion(conversion);\n                        }\n                        return [3 /*break*/, 3];\n                    case 2:\n                        token_txs.forEach(function (a) { return __awaiter(_this, void 0, void 0, function () {\n                            var transfer;\n                            return __generator(this, function (_a) {\n                                switch (_a.label) {\n                                    case 0: return [4 /*yield*/, erc20_1.Transfer.processLog(this.w3, a[0], a[1], a[2])];\n                                    case 1:\n                                        transfer = _a.sent();\n                                        if (transfer !== undefined) {\n                                            this.ontransfer(transfer);\n                                        }\n                                        return [2 /*return*/];\n                                }\n                            });\n                        }); });\n                        _a.label = 3;\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    return TransactionHelper;\n}());\nexports.TransactionHelper = TransactionHelper;\n\n\n//# sourceURL=webpack://cic/./dist/helper.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! flagged exports */
/*! export Registry [provided] [maybe used in index (runtime-defined)] [usage prevents renaming] */
/*! export TransactionHelper [provided] [maybe used in index (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in index (runtime-defined)] [usage prevents renaming] */
/*! export abi [provided] [maybe used in index (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in index (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.abi = exports.TransactionHelper = exports.Registry = void 0;\nvar abi_1 = __webpack_require__(/*! ./bancor/abi */ \"./dist/bancor/abi/index.js\");\nvar abi_2 = __webpack_require__(/*! ./common/abi */ \"./dist/common/abi/index.js\");\nvar abi = {\n    'bancor': abi_1.abi,\n    'common': abi_2.abi,\n};\nexports.abi = abi;\nvar registry_1 = __webpack_require__(/*! ./registry */ \"./dist/registry.js\");\nObject.defineProperty(exports, \"Registry\", ({ enumerable: true, get: function () { return registry_1.Registry; } }));\nvar helper_1 = __webpack_require__(/*! ./helper */ \"./dist/helper.js\");\nObject.defineProperty(exports, \"TransactionHelper\", ({ enumerable: true, get: function () { return helper_1.TransactionHelper; } }));\n\n\n//# sourceURL=webpack://cic/./dist/index.js?");

/***/ }),

/***/ "./dist/registry.js":
/*!**************************!*\
  !*** ./dist/registry.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/*! CommonJS bailout: this is used directly at 11:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Registry = void 0;\nvar erc20_1 = __webpack_require__(/*! ./common/erc20 */ \"./dist/common/erc20.js\");\nvar Registry = /** @class */ (function () {\n    function Registry(w3, address, abis) {\n        this.w3 = w3;\n        this.abis = abis;\n        this.address = address;\n        this.contracts = {\n            'bancor_contract_registry': new this.w3.eth.Contract(this.abis['bancor']['contract_registry'], address),\n        };\n        this.contracts_r = {};\n        this.contracts_r[address] = this.contracts['bancor_contract_registry'];\n        this.tokens = [];\n        this.tokens_s = {};\n        this.tokens_r = {};\n        this.init = {\n            network: [1, 3],\n            tokens: [0, -1],\n        };\n        this.ontokensload = function (n) {\n            console.debug('tokens loaded', n);\n        };\n        this.onregistryload = function (s) {\n            console.debug('registry loaded');\n        };\n    }\n    // TODO: DRY\n    Registry.prototype.load = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            var cr, crid_hex, shaid;\n            var _this = this;\n            return __generator(this, function (_a) {\n                console.debug('loading registry');\n                cr = this.contracts['bancor_contract_registry'];\n                crid_hex = this.w3.utils.toHex('BancorConverterRegistry');\n                shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex);\n                cr.methods.getAddress(shaid).call().then(function (address) {\n                    var abi = _this.abis['bancor']['converter_registry'];\n                    _this.contracts['bancor_converter_registry'] = new _this.w3.eth.Contract(abi, address);\n                    _this.contracts_r[address] = _this.contracts['bancor_converter_registry'];\n                    console.log('bancor converter registry', address);\n                    _this.load_tokens();\n                    _this.init['network'][0]++;\n                    if (_this.init['network'][0] == _this.init['network'][1]) {\n                        _this.onregistryload(_this.address);\n                    }\n                });\n                crid_hex = this.w3.utils.toHex('BancorNetwork');\n                shaid = this.w3.eth.abi.encodeParameter('bytes32', crid_hex);\n                cr.methods.getAddress(shaid).call().then(function (address) {\n                    _this.contracts['bancor_network'] = new _this.w3.eth.Contract(_this.abis['bancor']['network'], address);\n                    _this.contracts_r[address] = _this.contracts['bancor_network'];\n                    console.log('bancor network', address);\n                    _this.init['network'][0]++;\n                    if (_this.init['network'][0] == _this.init['network'][1]) {\n                        _this.onregistryload(_this.address);\n                    }\n                });\n                return [2 /*return*/];\n            });\n        });\n    };\n    Registry.prototype.load_tokens = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            var cr;\n            var _this = this;\n            return __generator(this, function (_a) {\n                console.debug('loading tokens');\n                cr = this.contracts['bancor_converter_registry'];\n                cr.methods.getConvertibleTokens().call().then(function (addresses) { return __awaiter(_this, void 0, void 0, function () {\n                    var _this = this;\n                    return __generator(this, function (_a) {\n                        this.init['tokens'][1] = addresses.length;\n                        addresses.forEach(function (address) { return __awaiter(_this, void 0, void 0, function () {\n                            var _this = this;\n                            return __generator(this, function (_a) {\n                                this.add_token(address).then(function () {\n                                    console.debug('l ', _this.tokens.length, addresses.length);\n                                    if (_this.tokens.length == addresses.length) {\n                                        _this.ontokensload(_this.tokens.length);\n                                    }\n                                }).catch(function (e) {\n                                    console.error(e);\n                                });\n                                return [2 /*return*/];\n                            });\n                        }); });\n                        return [2 /*return*/];\n                    });\n                }); });\n                return [2 /*return*/];\n            });\n        });\n    };\n    Registry.prototype.add_token = function (address) {\n        return __awaiter(this, void 0, void 0, function () {\n            var abi, ct, symbol, name, t, ti;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        abi = this.abis['common']['erc20'];\n                        ct = new this.w3.eth.Contract(abi, address);\n                        return [4 /*yield*/, ct.methods.symbol().call()];\n                    case 1:\n                        symbol = _a.sent();\n                        return [4 /*yield*/, ct.methods.name().call()];\n                    case 2:\n                        name = _a.sent();\n                        t = new erc20_1.Token(address, name, symbol);\n                        ti = this.tokens.length;\n                        this.tokens.push(t);\n                        this.tokens[t.symbol] = this.tokens[ti];\n                        this.tokens_r[address] = this.tokens[ti];\n                        this.init['tokens'][0]++;\n                        console.log('added token', t.toString(), ti, address);\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    return Registry;\n}());\nexports.Registry = Registry;\n\n\n//# sourceURL=webpack://cic/./dist/registry.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./dist/index.js");
/******/ })()
;