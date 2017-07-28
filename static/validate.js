var flag = "";

var adm = function (a) {
  var b = /^1|0\d{11}$|^\d{6}[1-9]\d{2}0$/;
  var c = /^0{8}[1-9]?\w[1-9]\d*$/;

  var e = b.test(a);
  var f = c.test(a);

  if (e == true && bc(a) && alxd(a) != "99") {
    return true;
  } else {
    return false;
  }
};

var bc = function (a) {
  var b;
  var d = new Date();
  var e = d.getFullYear();
  var f = e.toString();
  var g = f.substring(2);
  if (a.length == 12) {
    b = a.substring(5, 7);
  } else {
    b = a.substring(4, 6);
  }
  //console.log(b + " " + g);
  if (b <= 00 || b > g) {
    return false;
  }
  return true;
};

var ahm = function (a) {
  var b = /^\d{8}$/;
  var c = /^0{8}$/;
  var d = /^0{11}-?[1-9]*\w\d*$/;
  var e = b.test(a);
  var f = c.test(a);
  if (e == true && f == false) {
    return true;
  } else {
    return false;
  }
};

var acq = function (a) {
  var b = /^\d{8}$/;
  var c = /^0{8}$/;
  var d = /^0{11}-?[1-9]*\w\d*$/;
  var e = b.test(a);
  if (e == true) {
    var g = new Date();
    var h = g.getFullYear();
    var i = g.getMonth() + 1;
    var j = g.getDate();
    var k = a.substring(0, 4);
    var l = parseInt(a.substring(4, 6), 10);
    var m = parseInt(a.substring(6), 10);
    var n = ca(0);
    var t = ca(1);
    if ((h != k && h - 1 != k) || l == 0 || l > 12 || m == 0 || m > 31 || a > n || !cb(k, l, m) || (h == k && i == l && j == m)) {
      return false;
    }
    if (h - 1 == k && a <= t) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};


function ca(i) {
  var a = new Date();
  var b = 0;
  var c = 0;
  var d = 0;
  var e = "";
  b = a.getFullYear() - i;
  c = a.getMonth() + 1;
  d = a.getDate();
  e += b;
  if (c >= 10) {
    e += c;
  } else {
    e += "0" + c;
  }
  if (d >= 10) {
    e += d;
  } else {
    e += "0" + d;
  }
  return e;
}
/*
function cb(a,b,c){
	if(b==2){
		if(c>29){
			return false;
		}
		if (((a % 4)==0) && ((a % 100)!=0) || ((a % 400)==0)) {
			if(c>28){
				return false;
			}
		}
	}else if((b==4||b==6||b==9||b==11)&&c>30){
		return false;
	}
	return true;
}
*/
function cb(a, b, c) {
  if (c > 31) {
    return false;
  } else if (c < 1) {
    return false;
  } else {
    if (b == 2) {
      if (c > 29) { //2月不会超过29
        return false;
      }
      if (((a % 4) == 0) && ((a % 100) != 0) || ((a % 400) == 0)) { //闰年1--29
        return true;
      } else { //平年1--28
        if (c > 28) {
          return false;
        }
      }
    } else if ((b == 4 || b == 6 || b == 9 || b == 11) && c > 30) {
      return false;
    }
  }
  return true;
}
var alxd = function (a) {
  var b;
  var c = "99";

  if (a.length == 12) {
    b = a.substring(7, 8);
    for (var i = 0; i < code.length; i++) {
      if (a == code[i]) {
        c = "10";
        break;
      }
    }
    if (c == "99") { //增加判断，判断是否为新版电子票
      if (a.charAt(0) == '0' && a.substring(10, 12) == '11') {
        c = "10";
      }
      if (a.charAt(0) == '0' && (a.substring(10, 12) == '06' || a.substring(10, 12) == '07')) { //判断是否为卷式发票  第1位为0且第11-12位为06或07
        c = "11";
      }
    }
    if (c == "99") { //如果还是99，且第8位是2，则是机动车发票
      if (b == 2 && a.charAt(0) != '0') {
        c = "03";
      }
    }

  } else if (a.length == 10) {
    b = a.substring(7, 8);
    if (b == 1 || b == 5) {
      c = "01";
    } else if (b == 6 || b == 3) {
      c = "04";
    } else if (b == 7 || b == 2) {
      c = "02";
    }
  }
  return c;
};

var aje = function (a, b) {
  var c = alxd(a);
  if (c == "01" || c == "02" || c == "03") {
    return ea(b);
  } else {
    return eb(b);
  }
};

var ea = function (a) {
  var b = /(^-?\d{1,11}$)|(^-?\d{1,11}\.\d{1,2}$)/;
  var c = b.test(a);
  return c;
};

var eb = function (a) {
  var b = /^-?(\d+$)|(\d+\.\d{1,2})$/;
  var c = b.test(a);
  return c;
};

var ajy = function (a) {
  var b = /^\d{6}$/;
  var e = b.test(a);
  return e;
};

function avym(yzm) {
  var code;
  for (var i = 0; i < yzm.length; i++) {
    code = yzm.charCodeAt(i);
    if ((code > 65248) || (code == 12288)) {
      //console.log(code);
      return false;
    }
  }
  return true;
}

function aept(fpdm, fphm, kprq, kjje, yzm) {

  if (fpdm == "" || fphm == "" || kprq == "" || kjje == "") { //||yzm==""){
    return false;
  } else {
    if (yzm == "" || yzm == "请输入验证码") {
      //console.log("yzmm null ");
      return false;
    } else {
      //console.log("yzmm : " + yzm);
      return true;
    }
  }
  //return true;
}

function arw() {

  $('#fpdm').val("");
  $('#fphm').val("");
  $('#kprq').val("YYYYMMDD");
  $('#kjje').val("");
  $("#yzm_img").attr("src", "images/code.png");
  $("#yzm_unuse_img").attr("src", "images/code.png");
  $("#context").text("开具金额(不含税)：");
  $("#fpdmjy").text("请输入发票代码");
  $("#fpdmjy").removeClass().addClass("tip_common");
  $("#fphmjy").text("请输入发票号码");
  $("#fphmjy").removeClass().addClass("tip_common");
  $("#kprqjy").text("请输入开票日期");
  $("#kprqjy").removeClass().addClass("tip_common");
  $("#kjjejy").text("请输入开具金额");
  $("#kjjejy").removeClass().addClass("tip_common");
  $('#yzm').val("请输入验证码");
  $('#yzm').css('color', '#999999');
  $('#kprq').css('color', '#999999');
  $("#yzminfo").text("");
  xsje = 1;
  yzmSj = "";
  show_yzm = "";
  $("#fpdm").focus();
  //removeGrzx();
}

function avai(fplx) {
  var fpdm = $("#fpdm").val().trim();
  var fphm = $("#fphm").val().trim();
  var kprq = $("#kprq").val().trim();
  var kjje = $("#kjje").val().trim();
  var yzm = $("#yzm").val().trim();
  var jqbm = "";
  var fpskm = "";
  var flag = 1;

  if (kprq == "YYMMDD") {
    kprq = "";
  }
  /*if(yzm=="请输入验证码"){
  	yzm="";
  }*/

  if (!aept(fpdm, fphm, kprq, kjje, yzm)) {
    //console.log('avai falseeee');
    return false;
  }

  if (fplx == "99") {
    return false;
  }

  if (fplx == "01" || fplx == "02" || fplx == "03") {
    flag = 0;
  }

  var c = /^[0-9]*$/;
  var f = c.test(fpdm);
  if (f == false) {
    return false;
  }

  if (adm(fpdm) && ahm(fphm) && acq(kprq) && ((flag == 0 && aje(fpdm, kjje)) || (flag == 1 && ajy(kjje))) && avym(yzm)) {
    return true;
  }


  //console.log('avai false');
  return false;

}
//lirongchun 增加 aur() 是判断用户是否登录，如果未登录则返回false，前台转向至登录页面
function aur() {
  var fpdm = $("#fpdm").val().trim();
  var fphm = $("#fphm").val().trim();
  var kprq = $("#kprq").val().trim();
  var kjje = $("#kjje").val().trim();
  var yzm = $("#yzm").val().trim();
  if (fpdm == "" || fphm == "" || kprq == "" || kjje == "" || yzm == "" || yzm == "请输入验证码") {
    jAlert('请先输入各项信息！', '提示');
    return false;
  } else {
    return true;
  }
  /*
  var username = getCookie('username');
  if (username == "") { //未登录
  	return false;
  } else {
  	*/
  return true;
  //}
}

function acb(fplx) {

  if (avai(fplx)) {
    $('#uncheckfp').hide();
    $('#checkfp').show();
  } else {
    $('#checkfp').hide();
    $('#uncheckfp').show();
  }
}
