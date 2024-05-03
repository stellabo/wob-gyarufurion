//---------------------------------------

var ctrlFlg = false;    //Ctrlキーの押下判定フラグ

//マウスホイールが回転した時の処理
function mousewheelFunc(e){
    //Ctrlキーが押下されている場合は、拡大・縮小処理を行わない
    if (ctrlFlg){
        if (e.preventDefault()){
            e.preventDefault();
        } else {
            return false;
        }
    }
}

//マウスホイールのイベントリスナー登録
window.addEventListener("mousewheel", mousewheelFunc, { passive: false } );


//Ctrlキー押下または離した場合の処理
function keyUpDownFunc(e){
    //コントロールキーの状態を取得
    ctrlFlg = e.ctrlKey;    //コントロールキーが押下されている場合はtrue, 離された場合はfalse
    
    return;
}

 //キーボード操作時のイベントリスナー登録
document.addEventListener("keyup", keyUpDownFunc);
document.addEventListener("keydown", keyUpDownFunc);

//---------------------------------------

const cardImgSize = {x:123/4,y:180/4,margin:5} 

//ウィンドウに表示させる
window.onload = function() {

    /**
     * ボードのカード置き場の枠を描画する
     */

    // 枠を表示するためのコンテナを作成
    var container = new createjs.Container();
    console.log("Container created"); // ログを追加

    for(var i = 0; i < 7 ; i++){
        var zone = new createjs.Shape();
        zone.graphics.beginStroke("#ffffff");
        zone.graphics.drawRect((cardImgSize.y-cardImgSize.x)/2, 0, cardImgSize.x, cardImgSize.y);
        zone.regX = cardImgSize.y/2;
        zone.regY = cardImgSize.y/2;
        zone.x = 28+40*i;
        zone.y = 40;

        container.addChild(zone);
    }

    console.log("Zone created"); // ログを追加

    // メインのキャンバスにコンテナを追加
    const Canv = document.getElementById("canv") ;
    const stage = new createjs.Stage(Canv);
    //stage.enableMouseOver();
    stage.addChild(container);
    console.log("Stage updated"); // ログを追加

   //画面下部のメッセージ
   const createdbyText = new createjs.Text("Created by  ", "6px serif","white");
   const twiAccountText = new createjs.Text("@whfre", "6px serif","white");
   const updateText = new createjs.Text(" 開発中…", "6px serif","white");
   twiAccountText.x = createdbyText.getMeasuredWidth();
   updateText.x = createdbyText.getMeasuredWidth()+twiAccountText.getMeasuredWidth()+5;
   twiAccountText.color = "#1111cc";
   twiAccountText.cursor = "pointer";
   const hitAreaShape = new createjs.Shape;
   hitAreaShape.set({
       graphics : new createjs.Graphics().beginFill("#FFF").drawEllipse(0,0,twiAccountText.getMeasuredWidth(),twiAccountText.getMeasuredHeight())
   });
   twiAccountText.hitArea = hitAreaShape;
   const footerContainer = new createjs.Container;
   footerContainer.addChild(createdbyText,twiAccountText,updateText);
   twiAccountText.addEventListener("click",clicktwiAccountText);
   //twitterアカウントを開く処理
   function clicktwiAccountText(event) {               
       window.open("https://twitter.com/whfre")
   };
   stage.addChild(footerContainer);
   footerContainer.y =  140;
   stage.update();
};

