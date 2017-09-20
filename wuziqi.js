var C = new Array(15);
var context;
var flag = false;
var end = false;

function init() {
    for (var i = 0; i < 15; i++) {
        C[i] = new Array(15);
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            C[i][j] = 0;
        }
    }
    var canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    context.translate(500, 200);
}

//棋盘
function qipan() {
    init();
    //框
    kuang();
    //线
    line();
    canvas.onclick = function (e) {
        var x = e.clientX - canvas.offsetLeft - 500;
        var y = e.clientY - canvas.offsetTop - 200;
        console.log(Math.round(x / 20), Math.round(y / 20));
        dianji(Math.round(x / 20), Math.round(y / 20));
    };
}

//框
function kuang() {
    context.lineWidth = 2;
    context.strokeRect(2, 2, 282, 282);
    context.lineWidth = 4;
    context.strokeRect(-6, -6, 298, 298);

    context.beginPath();
    context.arc(143, 143, 1, 0, 360, false);
    context.stroke();

    context.beginPath();
    context.arc(83, 83, 1, 0, 360, false);
    context.stroke();

    context.beginPath();
    context.arc(203, 203, 1, 0, 360, false);
    context.stroke();

    context.beginPath();
    context.arc(83, 203, 1, 0, 360, false);
    context.stroke();

    context.beginPath();
    context.arc(203, 83, 1, 0, 360, false);
    context.stroke();


}

//画线
function line() {
    for (var i = 0; i < 13; i++) {
        context.beginPath();
        context.moveTo(23 + 20 * i, 2);
        context.lineTo(23 + 20 * i, 282);
        context.lineWidth = "1";
        context.stroke();
    }
    for (var j = 0; j < 13; j++) {
        context.beginPath();
        context.moveTo(2, 22 + 20 * j);
        context.lineTo(282, 22 + 20 * j);
        context.lineWidth = "1";
        context.stroke();
    }
}

//棋子
function qizi(x, y, color) {
    context.save();
    context.beginPath();
    context.arc(x * 20 + 2, y * 20 + 2, 3, 0, 360, false);
    context.lineWidth = 6;
    context.strokeStyle = color;
    context.stroke();
    context.restore();

    context.beginPath();
    context.arc(x * 20 + 2, y * 20 + 2, 6, 0, 360, false);
    context.lineWidth = 0.5;
    context.stroke();

}


//下棋
function dianji(x, y) {
    if (C[x][y] != 0 || end) {
        return;
    }
    if (flag) {
        flag = false;
        C[x][y] = 1;
        qizi(x, y, "black");
    } else {
        C[x][y] = 2;
        flag = true;
        qizi(x, y, "white");
    }
    check(x, y);
}

//开始游戏
function start() {
    var button = document.getElementById("start");
    button.onclick = function () {
        end = false;
        context.clearRect(-7, -7, 300, 300);
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                C[i][j] = 0;
            }
        }
        //框
        kuang();
        //线
        line();

    }
}

//判断胜负
function check(x, y) {
    var count = 0, count1 = 0, count2 = 0, count3 = 0;
    var c = C[x][y];
    //水平
    for (var i = 1; i < 5; i++) {
        if ((x + i) < 15 && C[x + i][y] == c) {
            count++;
        }
        if ((x - i) >= 0 && C[x - i][y] == c) {
            count++;
        }
    }
    //竖直
    for (var i = 1; i < 5; i++) {
        if ((y - i) >= 0 && C[x][y - i] == c) {
            count1++;
        }
        if ((y + i) < 15 && C[x][y + i] == c) {
            count1++;
        }
    }
    //对角线
    for (var i = 1; i < 5; i++) {
        if ((x + i) < 15 && (y + i) < 15 && C[x + i][y + i] == c) {
            count2++;
        }
        if ((x - i) >= 0 && (y - i) >= 0 && C[x - i][y - i] == c) {
            count2++;
        }
    }
    for (var i = 1; i < 5; i++) {
        if ((x + i) < 15 && (y - i) >= 0 && C[x + i][y - i] == c) {
            count3++;
        }
        if ((y + i) < 15 && (x - i) >= 0 && C[x - i][y + i] == c) {
            count3++;
        }
    }
    console.log(count + "," + count1 + "," + count2 + "," + count3);
    if (count >= 4 || count1 >= 4 || count2 >= 4 || count3 >= 4) {
        context.font = "bold 36px 宋体";
        context.fillStyle = "red";
        context.fillText("游戏结束", 90, 150, 100, 40);
        end = true;
    }
}

function Addonload(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload  = func;
    } else {
        window.onload=function(){
            oldonload();//1func() 2func(1func,func2) 3func(2func(1func,func2) func3)......
            func();
        }
    }

}

Addonload(qipan);
Addonload(start);