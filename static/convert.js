 function convertQuery(jsonData, data, callback) {
   const {
     fpdm,
     fphm,
     kprq,
     fpje,
     yzm,
     iv,
     salt,
     fplx,
     index,
     yzmSj,
   } = data;

   const swjg = getSwjg(fpdm, 0);
   const swjgmc = swjg.area;
   const origin = 'https://inv-veri.chinatax.gov.cn';

   var cyjgdm = jsonData.key1;
   var iterationCount = 100;
   var keySize = 128;
   var aesUtil = new AesUtil(keySize, iterationCount);

   if (cyjgdm == '001') {
     var t = jsonData.key5;
     var hwxx = jsonData.key3;
     var jmbz = '';
     var jmsort = aesUtil.decrypt(jsonData.key8, jsonData.key7, jsonData.key9, jsonData.key10); //解密排序顺序
     var tt = jsonData.key6;
     var jsname = '';

     eval(t);

     if (jsonData.key4.trim() != '') {
       jmbz = aesUtil.decrypt(jsonData.key8, jsonData.key7, jsonData.key9, jsonData.key4); //解密备注
     }
     jsname = jsonData.key11 + '.js'; //用哪个js，从后台传过来。还需要一个配置页面
     eval(tt);

     $.getScript(`${origin}/js/${jsname}`, () => {
       // 加载,并执行回调函数 (回调函数是空的)
       convertToText(result, callback);
     });

     return true;

   } else if (cyjgdm == '1') {
     return '该省尚未开通发票查验功能';
   } else if (cyjgdm == '002') {
     return '超过该张发票当日查验次数(请于次日再次查验)!';
   } else if (cyjgdm == '003') {
     return '发票查验请求太频繁，请稍后再试！';
   } else if (cyjgdm == '004') {
     return '超过服务器最大请求数，请稍后访问!';
   } else if (cyjgdm == '005') {
     return '请求不合法!';
   } else if (cyjgdm == '020') {
     return '由于查验行为异常，涉嫌违规，当前无法使用查验服务！';
   } else if (cyjgdm == '006') {
     return '不一致';
   } else if (cyjgdm == '007') {
     return '验证码失效!';
   } else if (cyjgdm == '008') {
     return '验证码错误!';
   } else if (cyjgdm == '009') {
     return '查无此票';
   } else if (cyjgdm == 'rqerr') {
     return '当日开具发票可于次日进行查验！';
   } else if (cyjgdm == '010') {
     const etype = jsonData.key2;

     if (etype == 'inredis') {
       etype = '(02)';
     } else if (etype == 'weberr') {
       etype = '(03)';
     }
     return `网络超时，请重试！${etype}, 系统错误`;
   } else if (cyjgdm == '010_') {
     return '网络超时，请重试！(05)', '系统错误';
   } else {
     return '网络超时，请重试！(04)', '系统错误';
   }
 }


 String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
   if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
     return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
   } else {
     return this.replace(reallyDo, replaceWith);
   }
 }

 function getje(je, ss) {
   if (typeof (je) != "undefined" && je != "") {
     return accAdd(je, ss);
   } else {
     return je;
   }
   //return je;
 }
 //加法函数，用来得到精确的加法结果
 //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 //调用：accAdd(arg1,arg2)
 //返回值：arg1加上arg2的精确结果
 function accAdd(arg1, arg2) {
   var r1, r2, m;
   if (arg1.trim() == "") {
     return arg1;
   }
   if (parseInt(arg1, 10) == arg1) {
     r1 = 0;
   } else {
     r1 = arg1.toString().split(".")[1].length;
   }
   if (parseInt(arg2, 10) == arg2) {
     r2 = 0;
   } else {
     r2 = arg2.toString().split(".")[1].length;
   }
   m = Math.pow(10, Math.max(r1, r2));
   //alert(m);
   var r = (arg1 * m + arg2 * m) / m;
   return r.toFixed(2);
 }


 function GetJeToDot(je) {
   if (typeof (je) != "undefined" && je.trim() != "") {
     if (je.trim() == '-') {
       return je;
     }
     je = je.trim() + "";
     if (je.substring(0, 1) == '.') {
       je = '0' + '.' + je.substring(1, je.length);
       return je;
     }
     var index = je.indexOf(".");
     if (index < 0) {
       je += ".00";
     } else if (je.split(".")[1].length == 1) {
       je += "0";
     }
     if (je.substring(0, 2) == '-.') {
       je = '-0.' + je.substring(2, je.length);
     }
     return je;
   } else {
     return je;
   }

 }


 function NoToChinese(currencyDigits, fplx) {
   // Constants:
   var MAXIMUM_NUMBER = 99999999999.99;
   // Predefine the radix characters and currency symbols for output:
   var CN_ZERO = "零";
   var CN_ONE = "壹";
   var CN_TWO = "贰";
   var CN_THREE = "叁";
   var CN_FOUR = "肆";
   var CN_FIVE = "伍";
   var CN_SIX = "陆";
   var CN_SEVEN = "柒";
   var CN_EIGHT = "捌";
   var CN_NINE = "玖";
   var CN_TEN = "拾";
   var CN_HUNDRED = "佰";
   var CN_THOUSAND = "仟";
   var CN_TEN_THOUSAND = "万";
   var CN_HUNDRED_MILLION = "亿";
   var CN_SYMBOL = "";
   var CN_DOLLAR = "圆";
   var CN_TEN_CENT = "角";
   var CN_CENT = "分";
   var CN_INTEGER = "整";
   if (fplx == "02" || fplx == "03") {
     CN_DOLLAR = "元";
   }

   // Variables:
   var integral; // Represent integral part of digit number.
   var decimal; // Represent decimal part of digit number.
   var outputCharacters; // The output result.
   var parts;
   var digits, radices, bigRadices, decimals;
   var zeroCount;
   var i, p, d;
   var quotient, modulus;

   // Validate input string:
   currencyDigits = currencyDigits.toString();
   if (currencyDigits.trim() == "") {
     //alert("请输入小写金额！");
     return "";
   }
   if (currencyDigits.match(/[^,.\d]/) != null) {
     if (currencyDigits.substring(0, 1) != '-') {
       alert("小写金额含有无效字符！");
       return "";
     }
   }
   if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
     if (currencyDigits.substring(0, 1) != '-') {
       alert("小写金额的格式不正确！");
       return "";
     }
   }
   var fushuflag = "";
   if (currencyDigits.substring(0, 1) == '-') {
     if (fplx == "01" || fplx == "04") {
       fushuflag = "（负数）";
     } else if (fplx == "02" || fplx == "03" || fplx == "11") {
       fushuflag = "负数：";
     } else if (fplx == "10") {
       fushuflag = "负";
     } else {
       fushuflag = "（负数）";
     }

     currencyDigits = currencyDigits.substring(1, currencyDigits.length);
   }
   // Normalize the format of input digits:
   currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
   currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
   // Assert the number is not greater than the maximum number.
   if (Number(currencyDigits) > MAXIMUM_NUMBER) {
     alert("金额过大，应小于1000亿元！");
     return "";
   }

   // Process the coversion from currency digits to characters:
   // Separate integral and decimal parts before processing coversion:
   parts = currencyDigits.split(".");
   if (parts.length > 1) {
     integral = parts[0];
     decimal = parts[1];
     // Cut down redundant decimal digits that are after the second.
     decimal = decimal.substr(0, 2);
   } else {
     integral = parts[0];
     decimal = "";
   }
   // Prepare the characters corresponding to the digits:
   digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
   radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
   bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
   decimals = new Array(CN_TEN_CENT, CN_CENT);
   // Start processing:
   outputCharacters = "";
   // Process integral part if it is larger than 0:
   if (Number(integral) > 0) {
     zeroCount = 0;
     for (i = 0; i < integral.length; i++) {
       p = integral.length - i - 1;
       d = integral.substr(i, 1);
       quotient = p / 4;
       modulus = p % 4;
       if (d == "0") {
         zeroCount++;
       } else {
         if (zeroCount > 0) {
           outputCharacters += digits[0];
         }
         zeroCount = 0;
         outputCharacters += digits[Number(d)] + radices[modulus];
       }
       if (modulus == 0 && zeroCount < 4) {
         outputCharacters += bigRadices[quotient];
         zeroCount = 0;
       }
     }
     outputCharacters += CN_DOLLAR;
   }
   // Process decimal part if there is:
   if (decimal != "") {
     for (i = 0; i < decimal.length; i++) {
       d = decimal.substr(i, 1);
       if (d != "0") {
         outputCharacters += digits[Number(d)] + decimals[i];
       }
     }
   }
   // Confirm and return the final output string:
   if (outputCharacters == "") {
     outputCharacters = CN_ZERO + CN_DOLLAR;
   }
   if (decimal == "" || decimal == "00" || decimal == "0") {
     outputCharacters += CN_INTEGER;
   }
   outputCharacters = fushuflag + CN_SYMBOL + outputCharacters;
   return outputCharacters;
 }


 function convertToText(result, callback) {
   var data = result;
   var sechw;

   var tempno = data.template;
   var fplx, hwxxs, fpxxs;

   if (tempno == 0) {
     fplx = data.fplx;
     hwxxs = data.hwxx;
     fpxxs = data.fpxx;
   } else if (tempno == 1) {
     fplx = data.f3ld;
     hwxxs = data.fdzx;
     fpxxs = data.h2gx;
   } else if (tempno == 2) {
     fplx = data.a3b0;
     hwxxs = data.eb2a;
     fpxxs = data.f8d7;
   } else if (tempno == 3) {
     fplx = data.c342;
     hwxxs = data.dbd2;
     fpxxs = data.d64b;
   } else if (tempno == 4) {
     fplx = data.af0b;
     hwxxs = data.c32a;
     fpxxs = data.a22a;
   } else if (tempno == 5) {
     fplx = data.ecae;
     hwxxs = data.c3c0;
     fpxxs = data.cb20;
   } else if (tempno == 6) {
     fplx = data.c3c8;
     hwxxs = data.a574;
     fpxxs = data.da20;
   } else if (tempno == 7) {
     fplx = data.dc02;
     hwxxs = data.cc66;
     fpxxs = data.ddbb;
   } else if (tempno == 8) {
     fplx = data.b3dd;
     hwxxs = data.c2b9;
     fpxxs = data.e72d;
   } else if (tempno == 9) {
     fplx = data.f16a;
     hwxxs = data.ceb5;
     fpxxs = data.a83e;
   }
   var rules = rule.split('☺');
   var splitstr = rules[0];
   fpxxs = fpxxs.replaceAll(splitstr, "≡");
   hwxxs = hwxxs.replaceAll(splitstr, "≡");
   splitstr = "≡";
   var sort = data.sort;
   var sortarray = sort.split("_");
   var tmpfpxx = fpxxs.split("≡");
   var cysj = tmpfpxx[tmpfpxx.length - 1];
   var tmpfp = new Array(tmpfpxx.length - 4);
   for (i = 3; i < tmpfpxx.length - 1; i++) {
     tmpfp[i - 3] = tmpfpxx[i];
   }

   var newfpxx = new Array(tmpfpxx.length - 4);
   for (i = 0; i < tmpfpxx.length - 4; i++) {
     newfpxx[i] = tmpfp[parseInt(sortarray[i])];
   }
   var newfpxxstr = tmpfpxx[0] + "≡" + tmpfpxx[1] + "≡" + tmpfpxx[2] + "≡";
   for (i = 0; i < newfpxx.length; i++) {
     newfpxxstr = newfpxxstr + newfpxx[i] + "≡";
   }
   fpxxs = newfpxxstr + cysj;
   fpxx = fpxxs.split('≡');

   callback({
     fpxxs: fpxxs.split('≡'),
     hwxxs: hwxxs.replace(/□/g, '').replace(/ █/g, '').split('█'),
     fplx: fplx,
     amount: GetJeToDot(getje(fpxx[19], rules[2])),
     tax: GetJeToDot(getje(fpxx[14], rules[2])),
     total_amount: GetJeToDot(getje(fpxx[15], rules[2])),
     total_amount_cn: NoToChinese(GetJeToDot(getje(fpxx[15], rules[2])), "04"),
   })
 }
