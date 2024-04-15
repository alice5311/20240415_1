// let p = ["#E26761", "#6693A0", "#EBC06F", "#A7A6A4", "#605951"];
// let bg = ["#F2EDEC"]; //背景及鼻子的米色
//let nw;
//let nh;

var colors ="E26761-6693A0-EBC06F-A7A6A4-605951".split("-").map(a=>"#"+a)
var rabbs = []
var rabb

class rabb_class{
  constructor(args){ //描述物件的初始值，只設定物件的資料內容
    //args一個參數，下方產生時(for)，若有輸入以其為主，否則為||後資料
    this.p =args.p || {x:width/2,y:height/2}; //位置
    this.w =args.w || random(50,100) //大小
    this.h =args.h || random(50,100)
    this.d =args.d || random(50,120)
    this.v ={x:random(-2,2),y:random(-2,2)}  //球的移動速度，有兩個屬性(x,y)，移動的速度
    this.color = args.color || random(colors)
    this.size1 = args.size1 || random(-40,30)
    this.size2 = args.size2 || random(150,220)
  }
  draw(){ //畫出物件畫面的程式碼
    push();
    translate(this.p.x + this.w / 2, this.p.y + this.h / 2);

    

    //  ミミ 耳朵
    strokeWeight(this.d / 3.4);
    stroke(this.color);
    noFill();
    arc(0, -this.d / 2, this.d / 1.5, this.d / 1.5, random(30,40), random(150,160));

    //  カオ
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.d, this.d / 1.12);

    //  メ
    fill("#000000");
    circle(-this.d / 6, -this.d / 50, this.d / 7.5);
    circle(this.d / 6, -this.d / 50, this.d / 7.5);

    //  クチ
    fill("#F2EDEC");
    ellipse(0, this.d / 7.5, this.d / 2.2, this.d / 3);

    //  ハナ
    fill(this.color);
    ellipse(0, this.d / 11, this.d / 5, this.d / 7);

    pop()
  }
  update(){ // 物件移動更新後移動的程式碼
    this.p.x = this.p.x+ this.v.x //x軸
    this.p.y = this.p.y+ this.v.y //y軸
    if(this.p.x<0){//碰到左邊
      this.v.x=-this.v.x
    }
    if(this.p.x>width){//碰到右邊
      this.v.x=-this.v.x
    }
    if(this.p.y<0){//碰到上面
      this.v.y=-this.v.y
    }
    if(this.p.y>height){//碰到下面
      this.v.y=-this.v.y
    }
  }

  israbbInRange(){ //計算物件與滑鼠間的距離是否小於直徑直徑
    //d:把目前這個物件的位置與滑鼠間的距離
    let dd =dist(mouseX,mouseY,this.p.x,this.p.y)
    if(dd<this.w){
      return true
    }
    else{
      return false
    }
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);//單位改為度數
  background("#F2EDEC");

  for (i=0;i<50;i=i+1){ //產生多個資料
    rabb= new rabb_class({ 
      //傳一串參數到class內
      p:{x:random(width/2-300,width/2+300),y:100}
    })
    rabbs.push(rabb)
  }
}

var score=0
function draw() {
  background("#F2EDEC");

  text("🔦",mouseX,mouseY)
  textSize(100)

  fill("#cdb4db")
  textSize(30)
  text("已抓到:"+score,50,130)

  for(j=0;j<rabbs.length;j=j+1){
    rabb = rabbs[j]
    rabb.draw()
    rabb.update()
      //滑鼠接近時產生的動作
      if(rabb.israbbInRange()){
        rabb.v.x=rabb.v.x+random(5,-5)
        rabb.v.y=rabb.v.y+random(5,-5)
      }
  }
  
  if (score==50) {
    textSize(30)
    text("謝謝你的幫忙!!你超棒👍",50,80)
  }
  else{
    textSize(30)
    text("請幫我捕捉逃跑的熊🥺",50,80)
  }
}

function mousePressed(){
  for(let rabb of rabbs){  //
    if(rabb.israbbInRange()){
      rabbs.splice(rabbs.indexOf(rabb),1)
      score=score+1
    }
  }
}
