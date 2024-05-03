window.onload = function() {
    // コードをここに移動して実行する
    // 白い四角形を作成
    var square = new createjs.Shape();
    square.graphics.beginFill("#FFFFFF").drawRect(50, 50, 80, 100);
    square.x = 0; // X座標
    square.y = 0; // Y座標

    console.log("Square created"); // ログを追加

    // 四角形を表示するためのコンテナを作成
    var container = new createjs.Container();
    container.addChild(square);

    console.log("Container created"); // ログを追加

    // メインのキャンバスにコンテナを追加
    const mainCanv = document.getElementById("canv") ;
    const mainstage = new createjs.Stage(mainCanv);
    //mainstage.enableMouseOver();
    mainstage.addChild(container);
    mainstage.update();
    console.log("Stage updated"); // ログを追加
  };
