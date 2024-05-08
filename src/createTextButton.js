export function createTextButton(text, font, keyColor, shadowColor) {
    const button = new createjs.Container();
    button.name = text;
    button.cursor = "pointer"; 
  
    // ラベル
    const label = new createjs.Text(text, font, keyColor);
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = label.getMeasuredWidth()/2;
    label.y = label.getMeasuredHeight()/2;
  
    // 透明背景
    const bg = new createjs.Shape();
    bg.graphics
      .beginFill("white")
      .drawRoundRect(0,0,label.getMeasuredWidth(),label.getMeasuredHeight(),10);
    bg.alpha = 0.01;
  
    button.addChild(label);
    button.addChild(bg);
  
    button.regX = label.getMeasuredWidth()/2;
    button.regY = label.getMeasuredHeight()/2;
  
    button.addEventListener("mouseover", handleMouseOverStart);
    button.addEventListener("mouseout", handleMouseOutStart);
    function handleMouseOverStart(event) {
        label.shadow = new createjs.Shadow(shadowColor, 0, 0, 20);
    };
    function handleMouseOutStart(event) {
        label.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 0, 0, 0);
    };
    return button;
  }