import { createTextButton }  from './createTextButton';
import { createButton }  from './createButton';
import * as status from './CardStatus.json';

const cardImgSize = {x:123,y:173,margin:10} 
//const windowSize = {w:cardImgSize.x*7, h:cardImgSize.y+20}
// 画像を表示する回数
const imageCount = 7;
//let animationStarted = false; // アニメーションが実行されたかどうかを示すフラグ
// 画像とIDの配列
var images = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png"];
var bitmaps = [];

var cardInfo; //カード情報格納用変数
var imageFileName; //ファイル名格納用変数
var atkPoint; //攻撃格納用変数
var defPoint; //HP格納用変数
var cardNameJP; //カード名格納用変数
var login = Array(7); //ログイン済みユニット格納配列
var challenge = 0;

var cardName = [
    "Gyarufurion",
    "Kentai154",
    "Kentai294",
    "Julianne",
    "Hearteater",
    "Gyarufur",
    "Sharbear",
    "Psychobattler",
    "Penguit",
    "Meiguru",
    "Beem",
    "Alligator",
    "Akamamushi",
    "Elephant"
];

var survive = false; //ギャルファリオン生存フラグ
var unit = 0; //召喚されたユニット数

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

// カ－ドをめくるアニメーション
function flipCard(card,imgurl) {
    // アニメーションの設定
    createjs.Tween.get(card)
    .to({scaleX: 0}, 200) // 横方向に縮小
    .call(changeCardImage, [card, imgurl]) // 画像を変更
    .to({scaleX: 1}, 200); // 元のサイズに戻す
}

// 画像を変更する関数
function changeCardImage(card,imgurl) {
    // ここでカードの裏面の画像を設定するなどの処理を行う
    card.image.src = imgurl; // カードの裏面の画像を設定（例）
}


//---------------------------------------

//ウィンドウに表示させる
window.onload = function() {

    /**
     * ボードのカード置き場の枠を描画する
     */

    // 枠を表示するためのコンテナを作成
    var container = new createjs.Container();

    for(var i = 0; i < 7 ; i++){
        var zone = new createjs.Shape();
        zone.graphics.beginStroke("#ffffff");
        zone.graphics.drawRect((cardImgSize.y-cardImgSize.x)/2, 0, cardImgSize.x, cardImgSize.y);
        zone.regX = cardImgSize.y/2;
        zone.regY = cardImgSize.y/2;
        zone.x = 120+160*i;
        zone.y = 150;

        container.addChild(zone);
    }

    console.log("Zone created"); // ログを追加

    // メインのキャンバスにコンテナを追加
    const Canv = document.getElementById("field") ;
    const stage = new createjs.Stage(Canv);
    stage.enableMouseOver();
    stage.addChild(container);
    console.log("Stage updated"); // ログを追加

   //--------------------------------------------

   //画面下部のメッセージ
   //--------------------------------------------
   const createdbyText = new createjs.Text("Created by  ", "24px serif","white");
   const twiAccountText = new createjs.Text("@whfre", "24px serif","white");
   const updateText = new createjs.Text("Release 2024.05.08 Chromeのみ動作確認", "24px serif","white");
   twiAccountText.x = createdbyText.getMeasuredWidth();
   updateText.x = createdbyText.getMeasuredWidth()+twiAccountText.getMeasuredWidth()+5;
   twiAccountText.color = "#e6f542";
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
   footerContainer.y =  650;
   //--------------------------------------------

   const HPText = new createjs.Text("ギャルファリオン残HP：  ", "50px serif","white");
   const drowcardText = new createjs.Text("召喚されたカード：  ", "50px serif","white");
   drowcardText.y = HPText.getMeasuredHeight();
   const statusContainer = new createjs.Container;

   const defPointText = new createjs.Text(defPoint, "50px serif","white");
   const cardNameJPText = new createjs.Text(cardNameJP, "50px serif","white");


   //
   /**
     * おみくじ開始
    */
   const gameStart = async()=>{
         /**
          * * * * スタート画面でカードを裏面で並べる
          * **/
         //--------------------------------------------

         // 上から順番に処理を実行する
        Promise.resolve()
        .then(function(){
            return new Promise(function (resolve, reject) {
         
            // 画像の読み込みとステージへの追加
            images.forEach(function(imageSrc, i) {
                var image = new Image();
                imageSrc = "Cardback.jpg"
                image.src = imageSrc;
                var back = new createjs.Bitmap(image);
                back.regX = cardImgSize.y/2;
                back.regY = cardImgSize.y/2;
                back.x = 600;
                back.y = 600;
            
                // アニメーションの設定
                createjs.Tween.get(back)
                .wait(i * 200) // 出現タイミングをずらす
                .to({x: 145+160*i, y: 150}, 500, createjs.Ease.getPowInOut(2.5)); // カードを配るアニメーション
                bitmaps.push(back); // ビットマップを配列に追加
                stage.addChild(back);
            
                // 画像にユニークなIDを追加
                bitmaps.forEach(function(back, i) {
                    back.id = "customImage" + (i + 1); // カスタムIDの例
                });

            });

            resolve('task1 完了!');
            console.log("task1 完了!");

            });
        })
        .then(function(){
            return new Promise(function (resolve, reject) {

                setTimeout(function() {

                    //ギャルファリオンの残りHP、引いたカード名を描画する欄の表示
                    statusContainer.addChild(HPText,drowcardText);
                    stage.addChild(statusContainer);
                    statusContainer.x =  0;
                    statusContainer.y =  450;
                    statusContainer.alpha = 0;
                    createjs.Tween.get(statusContainer).to({alpha:1.0},1000);

                    resolve('task2 完了!');
                    console.log("task2 完了!");
                }, 2000);

            });
        })
        .then(function(){
            return new Promise(function (resolve, reject) {

                setTimeout(function() {

                    // "image1" の画像(左端)を探す
                    var targetBitmap = bitmaps.find(function(bitmap) {
                    return bitmap.id === "customImage1";
                    });
                    // カード名に対応するカード情報にアクセス
                    cardInfo = status[cardName[0]];
                    // アクセスしたカード情報から 各種ステータス を取得
                    imageFileName = cardInfo.imageFileName;
                    defPoint = parseInt(cardInfo.defPoint);
                    cardNameJP = cardInfo.cardNameJP;
                    login[0] = cardNameJP; //ログイン済みユニットとして登録

                    // 左端のカードのみをめくるアニメーションを追加
                    flipCard(targetBitmap,imageFileName);

                    defPointText.x = HPText.getMeasuredWidth();
                    cardNameJPText.x = drowcardText.getMeasuredWidth();
                    cardNameJPText.y = drowcardText.getMeasuredHeight();
                    statusContainer.addChild(defPointText,cardNameJPText);

                    defPointText.text = defPoint;
                    cardNameJPText.text = cardNameJP;
                    survive = true; //ギャルファリオン生存フラグ

                    resolve('task3 完了!');
                    console.log("task3 完了!");

                }, 1500);

            });
        })
        .then(function(){

            if(survive){ //ギャルファリオンが生存していたら処理

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {
    
                        //2枚目のカードをめくる処理
                        var targetBitmap = bitmaps.find(function(bitmap) {
                            return bitmap.id === "customImage2";
                        });
                        //めくれたカードの確認
                        cardInfo = status[cardName[Math.floor(Math.random() * cardName.length)]];
                        imageFileName = cardInfo.imageFileName;
                        atkPoint = parseInt(cardInfo.atkPoint); 
                        defPoint = defPoint - atkPoint; 
                        cardNameJP = cardInfo.cardNameJP;
                        login[1] = cardNameJP;
                        flipCard(targetBitmap,imageFileName);
    
                        defPointText.text = defPoint;
                        cardNameJPText.text = cardNameJP;
                        unit++; //ユニット数＋１

                        if(defPoint <= 0){
                            defPointText.color = "#FF0000"; // HPを赤色に変更
                            survive = false; //ギャルファリオンログアウト
                        }
                    
    
                    resolve('task4 完了!');
                    console.log("task4 完了!");
    
                    }, 1000);
    
                });
            }
            else{
                //ギャルファリオン生存フラグが立っていない場合、何もしない
            }
        })
        .then(function(){

            if(survive){ //ギャルファリオンが生存していたら処理

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {
    
                        //3枚目のカードをめくる処理
                        var targetBitmap = bitmaps.find(function(bitmap) {
                            return bitmap.id === "customImage3";
                        });
                        cardInfo = status[cardName[Math.floor(Math.random() * cardName.length)]];
                        imageFileName = cardInfo.imageFileName;
                        atkPoint = parseInt(cardInfo.atkPoint); 
                        defPoint = defPoint - atkPoint; 
                        cardNameJP = cardInfo.cardNameJP;
                        login[2] = cardNameJP;
                        flipCard(targetBitmap,imageFileName);
    
                        defPointText.text = defPoint;
                        cardNameJPText.text = cardNameJP;
                        unit++;
                        if(defPoint <= 0){
                            defPointText.color = "#FF0000"; 
                            survive = false;
                        }
                    
    
                    resolve('task5 完了!');
                    console.log("task5 完了!");
    
                    }, 1000);
                
                });
            }
            else{
            }
        })
        .then(function(){

            if(survive){ //ギャルファリオンが生存していたら処理

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {
    
                        //4枚目のカードをめくる処理
                        var targetBitmap = bitmaps.find(function(bitmap) {
                            return bitmap.id === "customImage4";
                        });
                        cardInfo = status[cardName[Math.floor(Math.random() * cardName.length)]];
                        imageFileName = cardInfo.imageFileName;
                        atkPoint = parseInt(cardInfo.atkPoint); 
                        defPoint = defPoint - atkPoint; 
                        cardNameJP = cardInfo.cardNameJP;
                        login[3] = cardNameJP;
                        flipCard(targetBitmap,imageFileName);
    
                        defPointText.text = defPoint;
                        cardNameJPText.text = cardNameJP;
                        unit++;
                        if(defPoint <= 0){
                            defPointText.color = "#FF0000"; 
                            survive = false;
                        }
                    
    
                    resolve('task6 完了!');
                    console.log("task6 完了!");
    
                    }, 1000);
                
                });
            }
            else{
            }
        })
        .then(function(){

            if(survive){ //ギャルファリオンが生存していたら処理

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {
    
                        //5枚目のカードをめくる処理
                        var targetBitmap = bitmaps.find(function(bitmap) {
                            return bitmap.id === "customImage5";
                        });
                        cardInfo = status[cardName[Math.floor(Math.random() * cardName.length)]];
                        imageFileName = cardInfo.imageFileName;
                        atkPoint = parseInt(cardInfo.atkPoint); 
                        defPoint = defPoint - atkPoint; 
                        cardNameJP = cardInfo.cardNameJP;
                        login[4] = cardNameJP;
                        flipCard(targetBitmap,imageFileName);
    
                        defPointText.text = defPoint;
                        cardNameJPText.text = cardNameJP;
                        unit++;
                        if(defPoint <= 0){
                            defPointText.color = "#FF0000"; 
                            survive = false;
                        }
                    
    
                    resolve('task7 完了!');
                    console.log("task7 完了!");
    
                    }, 1000);
                
                });
            }
            else{
            }
        })
        .then(function(){

            if(survive){ //ギャルファリオンが生存していたら処理

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {
    
                        //6枚目のカードをめくる処理
                        var targetBitmap = bitmaps.find(function(bitmap) {
                            return bitmap.id === "customImage6";
                        });
                        cardInfo = status[cardName[Math.floor(Math.random() * cardName.length)]];
                        imageFileName = cardInfo.imageFileName;
                        atkPoint = parseInt(cardInfo.atkPoint); 
                        defPoint = defPoint - atkPoint; 
                        cardNameJP = cardInfo.cardNameJP;
                        login[5] = cardNameJP;
                        flipCard(targetBitmap,imageFileName);
    
                        defPointText.text = defPoint;
                        cardNameJPText.text = cardNameJP;
                        unit++;
                        if(defPoint <= 0){
                            defPointText.color = "#FF0000"; 
                            survive = false;
                        }
                    
    
                    resolve('task8 完了!');
                    console.log("task8 完了!");
    
                    }, 1000);
                
                });
            }
            else{
            }
        })
        .then(function(){

            if(survive){ //ギャルファリオンが生存していたら処理

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {
    
                        //7枚目のカードをめくる処理
                        var targetBitmap = bitmaps.find(function(bitmap) {
                            return bitmap.id === "customImage7";
                        });
                        cardInfo = status[cardName[Math.floor(Math.random() * cardName.length)]];
                        imageFileName = cardInfo.imageFileName;
                        atkPoint = parseInt(cardInfo.atkPoint); 
                        defPoint = defPoint - atkPoint; 
                        cardNameJP = cardInfo.cardNameJP;
                        login[6] = cardNameJP;
                        flipCard(targetBitmap,imageFileName);
    
                        defPointText.text = defPoint;
                        cardNameJPText.text = cardNameJP;
                        unit++;
                        if(defPoint <= 0){
                            defPointText.color = "#FF0000"; 
                            survive = false;
                        }
    
                    resolve('task9 完了!');
                    console.log("task9 完了!");
    
                    }, 1000);
                
                });
            }
            else{
            }
        })
        .then(function(){

                return new Promise(function (resolve, reject) {

                    setTimeout(function() {

                        const retryButton = createButton("リトライ", 150, 40, "#0275d8");
                        retryButton.x = 300;
                        retryButton.y = 500;

                        const postButton = createButton("結果をポスト", 150, 40, "#0275d8");
                        postButton.x = 525;
                        postButton.y = 500;

                        const clearButton = createButton("回数をリセット", 150, 40, "#0275d8");
                        clearButton.x = 750;
                        clearButton.y = 500;
                    
                        const overlay = new createjs.Shape();
                        overlay.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, field.width, field.height);
                        overlay.alpha = 0;
                        const overlayContent = new createjs.Container();
                        const overlayMessage = new createjs.Text("", "60px Arial", "#FFF");
                        overlayMessage.textAlign = "center";
                        overlayMessage.x = field.width / 2;
                        overlayMessage.y = field.height / 2;
                        overlayContent.addChild(overlay, overlayMessage, retryButton, postButton, clearButton);
                    
                        stage.addChild(overlayContent);

                        const savedchallenge = localStorage.getItem('challenge');
                            if (savedchallenge) {
                                challenge = parseInt(savedchallenge, 10);
                            }
                        challenge++;
                        localStorage.setItem('challenge', challenge);

                        overlayMessage.text = challenge + "回目："+ unit + " 体召喚!";
                        createjs.Tween.get(overlay).to({ alpha: 1 }, 500);

                        postButton.addEventListener("click", function() {

                            const tweetTextResult = (()=>{
                                if(survive){
                                    return "ギャルファリオンチャレンジ成功!";
                                }else{
                                    return "ギャルファリオンチャレンジ失敗!"
                                };
                            })();

                            let loginunit = '';
                            if(!survive) login[0]="";
                            for(let i = 0; i <= unit; i++){
                                loginunit = loginunit + login[i] +"/" ;
                            };
                            const tweetURL = "https://twitter.com/share?url=https://stellabo.github.io/wob-gyarufurion/dist/&related=twitterapi%2Ctwitter&hashtags=ギャルファリオンチャレンジ&text="
                                                +tweetTextResult+ challenge + "回目: "+unit+"体召喚!"+"\n"+"盤面→"+loginunit+"\n";

                            window.open(tweetURL, null,"width=650, height=300, personalbar=0, toolbar=0, scrollbars=1, sizable=1");
                        });
                    
                        retryButton.addEventListener("click", function() {
                            location.reload();    
                        });
                        clearButton.addEventListener("click", function() {
                            challenge = 0;
                            localStorage.clear();
                            location.reload();    
                        });
           
                    
                    resolve('task9 完了!');
                    console.log(unit + " 体召喚!");
    
                    }, 1000);
                
                });
        });

   };

   //ログインボタン
   //--------------------------------------------
   const startButton = createTextButton("ログイン","80px serif", "white","yellow")
    stage.addChild(startButton);
    startButton.x = 600;
    startButton.y = 450;
    startButton.addEventListener("click", handleClickStart);
    function handleClickStart(event) {
        startButton.mouseEnabled = false;
        gameStart();
        createjs.Tween.get(startButton).to({alpha:0},250);
    };
    //--------------------------------------------

    //常時ステージを更新
    //--------------------------------------------
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
        stage.update();
    };
    //--------------------------------------------

}

