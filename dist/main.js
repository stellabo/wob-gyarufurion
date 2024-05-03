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

eval("//---------------------------------------\n\nvar ctrlFlg = false;    //Ctrlキーの押下判定フラグ\n\n//マウスホイールが回転した時の処理\nfunction mousewheelFunc(e){\n    //Ctrlキーが押下されている場合は、拡大・縮小処理を行わない\n    if (ctrlFlg){\n        if (e.preventDefault()){\n            e.preventDefault();\n        } else {\n            return false;\n        }\n    }\n}\n\n//マウスホイールのイベントリスナー登録\nwindow.addEventListener(\"mousewheel\", mousewheelFunc, { passive: false } );\n\n\n//Ctrlキー押下または離した場合の処理\nfunction keyUpDownFunc(e){\n    //コントロールキーの状態を取得\n    ctrlFlg = e.ctrlKey;    //コントロールキーが押下されている場合はtrue, 離された場合はfalse\n    \n    return;\n}\n\n //キーボード操作時のイベントリスナー登録\ndocument.addEventListener(\"keyup\", keyUpDownFunc);\ndocument.addEventListener(\"keydown\", keyUpDownFunc);\n\n//---------------------------------------\n\nconst cardImgSize = {x:123/4,y:180/4,margin:5} \n\n//ウィンドウに表示させる\nwindow.onload = function() {\n\n    /**\n     * ボードのカード置き場の枠を描画する\n     */\n\n    // 枠を表示するためのコンテナを作成\n    var container = new createjs.Container();\n    console.log(\"Container created\"); // ログを追加\n\n    for(var i = 0; i < 7 ; i++){\n        var zone = new createjs.Shape();\n        zone.graphics.beginStroke(\"#ffffff\");\n        zone.graphics.drawRect((cardImgSize.y-cardImgSize.x)/2, 0, cardImgSize.x, cardImgSize.y);\n        zone.regX = cardImgSize.y/2;\n        zone.regY = cardImgSize.y/2;\n        zone.x = 28+40*i;\n        zone.y = 40;\n\n        container.addChild(zone);\n    }\n\n    console.log(\"Zone created\"); // ログを追加\n\n    // メインのキャンバスにコンテナを追加\n    const Canv = document.getElementById(\"canv\") ;\n    const stage = new createjs.Stage(Canv);\n    //stage.enableMouseOver();\n    stage.addChild(container);\n    console.log(\"Stage updated\"); // ログを追加\n\n   //画面下部のメッセージ\n   const createdbyText = new createjs.Text(\"Created by  \", \"6px serif\",\"white\");\n   const twiAccountText = new createjs.Text(\"@whfre\", \"6px serif\",\"white\");\n   const updateText = new createjs.Text(\" 開発中…\", \"6px serif\",\"white\");\n   twiAccountText.x = createdbyText.getMeasuredWidth();\n   updateText.x = createdbyText.getMeasuredWidth()+twiAccountText.getMeasuredWidth()+5;\n   twiAccountText.color = \"#1111cc\";\n   twiAccountText.cursor = \"pointer\";\n   const hitAreaShape = new createjs.Shape;\n   hitAreaShape.set({\n       graphics : new createjs.Graphics().beginFill(\"#FFF\").drawEllipse(0,0,twiAccountText.getMeasuredWidth(),twiAccountText.getMeasuredHeight())\n   });\n   twiAccountText.hitArea = hitAreaShape;\n   const footerContainer = new createjs.Container;\n   footerContainer.addChild(createdbyText,twiAccountText,updateText);\n   twiAccountText.addEventListener(\"click\",clicktwiAccountText);\n   //twitterアカウントを開く処理\n   function clicktwiAccountText(event) {               \n       window.open(\"https://twitter.com/whfre\")\n   };\n   stage.addChild(footerContainer);\n   footerContainer.y =  140;\n   stage.update();\n};\n\n\n\n//# sourceURL=webpack://wob-gyarufurion/./src/index.js?");

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