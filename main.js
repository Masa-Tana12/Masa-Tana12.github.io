let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;


//フレームレート維持
let frameCount = 0;
let statTime;

let chImg = new Image();
chImg.src = "sprite.png";
//chImg.onload = draw;

//キーボード
let keyb={};

//おじさんを作る
let ojisan = new Ojisan(100,100);
//フィールドを作る
let field = new Field();

//更新処理
function update()
{
	field.update();
	ojisan.update();
}

//スプライトの描画
function drawSprite(snum,x,y)
{
	let sx = (snum&15)<<4;
	let sy = (snum>>4)<<4;
	
	vcon.drawImage(chImg,sx,sy,16,32, x,y,16,32);
}

//描画処理
function draw()
{
	//画面を水色でクリア
	vcon.fillStyle="#66AAFF";
	vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);
	
	//マップを表示
	field.draw();
	//おじさんを表示
	ojisan.draw();
	
	
	//時間情報を表示
	vcon.font="12px 'Arial Black'";
	vcon.fillStyle="white";
	vcon.fillText("TIME:"+frameCount/100,5,15);
	
	//スコア情報を表示
	vcon.font="12px 'Arial Black'";
	vcon.fillStyle="white";
	vcon.fillText("SCORE:"+"1000",80,15);
	
	//デバック情報を表示
	vcon.font="12px 'Arial Black'";
	vcon.fillStyle="white";
	vcon.fillText("FRAME:"+frameCount,170,15);
	
	//仮想画面から実画面へ拡大転送
	con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
		0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);
}


//setInterval(mainLoop,1000/60);

//ループ開始
window.onload = function()
{
	startTime = performance.now();
	mainLoop();
}

//メインループ
function mainLoop()
{
	let nowTime  = performance.now();
	let nowFrame = (nowTime-startTime) / GAME_FPS;
	
	if( nowFrame > frameCount )
	{
		let c=0;
		while( nowFrame > frameCount )
		{
			frameCount++;
			//更新処理
			update();
			if( ++c>=4 )break;
		}
		//描画処理
		draw();
	}
	requestAnimationFrame(mainLoop);
}



//キーボードが押された時に呼ばれる
document.onkeydown = function(e)
{
	if(e.keyCode == 37)keyb.Left  = true;
	if(e.keyCode == 39)keyb.Right = true;
	if(e.keyCode == 90)keyb.BBUTTON = true;
	if(e.keyCode == 88)keyb.ABUTTON = true;
	
	if(e.keyCode == 65 )field.scx--;
	if(e.keyCode == 83 )field.scx++;
}

//キーボードが離された時に呼ばれる
document.onkeyup = function(e)
{
	if(e.keyCode == 37)keyb.Left  = false;
	if(e.keyCode == 39)keyb.Right = false;
	if(e.keyCode == 90)keyb.BBUTTON = false;
	if(e.keyCode == 88)keyb.ABUTTON = false;
}