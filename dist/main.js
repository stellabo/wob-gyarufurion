/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("//---------------------------------------\n\nvar ctrlFlg = false;    //Ctrlキーの押下判定フラグ\n\n//マウスホイールが回転した時の処理\nfunction mousewheelFunc(e){\n    //Ctrlキーが押下されている場合は、拡大・縮小処理を行わない\n    if (ctrlFlg){\n        if (e.preventDefault()){\n            e.preventDefault();\n        } else {\n            return false;\n        }\n    }\n}\n\n//マウスホイールのイベントリスナー登録\nwindow.addEventListener(\"mousewheel\", mousewheelFunc, { passive: false } );\n\n\n//Ctrlキー押下または離した場合の処理\nfunction keyUpDownFunc(e){\n    //コントロールキーの状態を取得\n    ctrlFlg = e.ctrlKey;    //コントロールキーが押下されている場合はtrue, 離された場合はfalse\n    \n    return;\n}\n\n //キーボード操作時のイベントリスナー登録\ndocument.addEventListener(\"keyup\", keyUpDownFunc);\ndocument.addEventListener(\"keydown\", keyUpDownFunc);\n\n//---------------------------------------\n\nconst cardImgSize = {x:123,y:180,margin:10} \n\n\n//https://developer.mozilla.org/ja/docs/Web/API/Window/devicePixelRatio\n\n//ウィンドウに表示させる\nwindow.onload = function() {\n\n    //---------------------------------------\n\n    //const ctx = Field.getContext(\"2d\");\n\n    // 表示サイズを設定（CSS におけるピクセル数です）。\n    //const size = 600;\n    //Field.style.width = `${size*2}px`;\n    //Field.style.height = `${size}px`;\n\n    // メモリ上における実際のサイズを設定（ピクセル密度の分だけ倍増させます）。\n    //const scale = window.devicePixelRatio; // Retina でこの値を 1 にするとぼやけた canvas になります\n    //Field.width = Math.floor(size * scale);\n    //Field.height = Math.floor(size * scale);\n\n    // CSS 上のピクセル数を前提としているシステムに合わせます。\n    //ctx.scale(scale, scale);\n\n    var fieldContainer = new createjs.Container;\n    var f = new createjs.Bitmap(\"Field.png\");\n    fieldContainer.addChild(f);   \n    const Field = document.getElementById(\"field\");\n    const stage2 = new createjs.Stage(Field);\n    stage2.addChild(fieldContainer);\n    stage2.update();\n\n    //---------------------------------------\n\n}\n\n\n\n//# sourceURL=webpack://wob-gyarufurion/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;