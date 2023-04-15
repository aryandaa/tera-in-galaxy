//variable
//membuat variable dengan nilai kosong agar bisa di isi dengan function
var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;
var mySound;
var myMusic;
var player= document.querySelectorAll('div#player img'); /*membuat variable bernama 'player' dengan 
                                                         mengambil nilai dari tag div yang mempunyai id='player' 
                                                         bertype img di html */

//membuat function dengan nama 'choose', function ini berfungsi menampilkan skin
function choose(){
    document.getElementById('player').style.display =""; //mengambil element dari id 'player' di html 

    document.querySelector('div.border div button').style.display = "none" /*tag div yag memiliki class 'border' dan tag div 
                                                                            lainnya kecuali memiliki id 'player', dan tag button 
                                                                            bernilai 'none' atau tidak ditampilkan 
                                                                            agar tidak mengganngu div yang memiliki id player*/

    document.querySelector('#setting').style.display = "none" //nilai dari id setting bertype 'none', atau tidak di tampilkan
}

//membuat perulangan pemilihan skin
for(let i=0; i<player.length; i++)/*membuat var let dengan nama i yang bernilai 0, 
                                    dan jika nilai i lebih kecil dari jumlah skin 
                                    maka tambahkan nilai i*/
{
    player[i].addEventListener('click', function(){
        iplayer = i; //untuk menyatakan bahwa 'iplayer' adalah var i
        startGame();
    }) /* menambahkan eventlistener click yang berfungsi agar skin tersebut bisa di klik,
        dan menambahkan function yang berisi untuk menyatakan bahwa 'iplayer' adalah var i ,ke player atau skin, */

}

//membuat 'object' yang memiliki nama myGameArea
var myGameArea = { //di dalam object tersebut ada:
    canvas : document.createElement("canvas"), //membuat parameter 'canvas'
    start : function() { //membuat function canvas gamenya,
        this.canvas.width = 900; //lebar dari canvas
        this.canvas.height = 500; //tinggi dari canvas
        // this.canvas.style.cursor = "none"; //menghapus cursor ketika cursor berada di game
        this.context = this.canvas.getContext("2d"); //getctx dari canvasnya
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0; //nilai awal dari score yang terdapat di canvas
        this.interval = setInterval(updateGameArea, 20);
        // window.addEventListener('touchmove' function (e) {
        //     myGameArea.x = e.touches[0].screen.x;
        //     myGameArea.y = e.touches[0].screen.y;
        // })
        window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
          },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        document.getElementById('skor').innerHTML = this.frameNo;
    }
}

//membuat function bernama startGame
function startGame() {
    myGamePiece = new component(100, 100, "roket"+iplayer+".png", 30, 100,"image"); /*menambahkan nilai variable
                                                                                    untuk var 'myGamePiece' yang memiliki component nilai
                                                                                    width,hight,nama file,perulangan, type gambar, dan type file */

    myBackground = new component(900, 500, "background.png", 0, 0, "image"); /*menambahkan nilai variable untuk var 'myBackground'
                                                                             yang menambahkan component berikut*/

    myGamePiece.gravity = 0.05; //menambahkan gravitasi ke variable myGamePiece atau karakter dengan nilai 0,05

    myScore = new component("20px", "Monotype", "white", 20, 40, "text"); /*menambahkan nilai untuk variable myScore
                                                                            yang menambahkan component ukuran tulisan, 
                                                                            type font, warna tulisan, width dan height, dan type nya*/
    mySound = new sound("sound2.mp3"); // menambahkan var mySound dengan component file type mp4
    myMusic = new sound("sound.mp3"); // menambahkan var MyMusic dengan component file type mp4
    myMusic.play(); //menambahkan method '.play' ke variable myMusik agar musik dinyalakan ketika game di mainkan
    myGameArea.start(); //menambahkan method '.start' untuk menjalankan object

    document.querySelector(".border").style.display = "none";
    document.getElementById('Tom').style.display ="none"; //untuk mulai ulang
    myObstacles.splice(0,myObstacles.length)

    

}



    

function component(width, height, color, x, y, type) /*membuat function untuk menyatakan component*/
{
    this.type=type; //untuk menyatakan kalo type nya harus sama
    if(type=="image"){ //jika type nya sama, yaitu image:
        this.image = new Image(); //buat variable baru bernama image()
        this.image.src = color; //dan buat code untuk resource image nya
    }
    //untuk menyatakan
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
    }
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }  else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY 
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
    }
  }
    this.hitTop = function() {
    var rocktop = 0;
    if (this.y < rocktop) {
      this.y = rocktop;
    }
  }
    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function sound(src) //membuat function dengan nama sound yang memiliki parameter 'src'
 {
    this.sound = document.createElement("audio"); //untuk menyatakan kalo 'sound' membuat nilai dengan file bertype audio
    this.sound.src = src; //untuk menyatakan kalo sound.src adalah source atau alamat dari file tersebut
    this.sound.setAttribute("preload", "auto"); //menambahkan method setAttribute yang berisi preload dan auto untuk memutarkan sound ketika game dimulai
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none"; //menghapus style display dari sound agar yang ditamppilkan cuman suara lagunya aja
    document.body.appendChild(this.sound);

    this.play = function(){ //function utntuk memplay sound
        this.sound.play();
    }
    this.stop = function(){ //function untuk mempause sound
        this.sound.pause();
    } 
       
}

function everyinterval(n) {//membuat function dengan nama everyInterval
    if ((myGameArea.frameNo / n) % 1 == 0) { //jika area.score bagi n dan hasil bagi 1 == 0 dan nilainya true, maka:
        return true; //kembalikan nilai dengan true
    }  return false; //jika salah, maka kembalikan nilai dengan value false
} //function ini berfungsi membuat player bisa menaikan dan menurunkan karakter


function accelerate(n) { //membuat function dengan nama accelerate 
    if (!myGameArea.interval) { //perkondisian jika player menaikan atau menurunkan karakter
        myGameArea.interval = setInterval(updateGameArea, 20); //jika benar atau true, maka tambah ketinggian/kerendahan karakter
    } myGamePiece.gravity = n; //jika false atau salah, maka jangan naikan/turunkan karakter
}//untuk naik turun tetapi makin lama ditekan tombolnya makin tinggi

//membuat controlor
document.addEventListener('keydown', function(e) { //jika karakter memencet tombol down
    if(e.which===32){ 
        accelerate(-0.2);//jika benar, turunkan karakter
    }
});
//dan begitupula dengan karakter menekan tombol up atau naik
document.addEventListener('keyup', function(e) {
    if(e.which===32){
        accelerate(0.5);
    }
}) 