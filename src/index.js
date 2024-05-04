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

const cardImgSize = {x:123,y:180,margin:10} 


//https://developer.mozilla.org/ja/docs/Web/API/Window/devicePixelRatio

//ウィンドウに表示させる
window.onload = function() {

    //---------------------------------------

    //const ctx = Field.getContext("2d");

    // 表示サイズを設定（CSS におけるピクセル数です）。
    //const size = 600;
    //Field.style.width = `${size*2}px`;
    //Field.style.height = `${size}px`;

    // メモリ上における実際のサイズを設定（ピクセル密度の分だけ倍増させます）。
    //const scale = window.devicePixelRatio; // Retina でこの値を 1 にするとぼやけた canvas になります
    //Field.width = Math.floor(size * scale);
    //Field.height = Math.floor(size * scale);

    // CSS 上のピクセル数を前提としているシステムに合わせます。
    //ctx.scale(scale, scale);

    var fieldContainer = new createjs.Container;
    var f = new createjs.Bitmap("Field.png");
    fieldContainer.addChild(f);   
    const Field = document.getElementById("field");
    const stage2 = new createjs.Stage(Field);
    stage2.addChild(fieldContainer);
    stage2.update();

    //---------------------------------------

}

