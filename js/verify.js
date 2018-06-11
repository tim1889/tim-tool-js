
function verify (val, type) {
  var rule = {
    msg: '',
    status: ture,
  }
  var reg = '';

  if (val.length === 0) { return false; }

  switch (type) {
    case 'number':
      reg = /^[0-9]*$/;
      rule.msg = '数字';
      break;
    case 'phone':
      reg = /^[0-9]{11}$/;
      rule.msg = '手机号';
      break;
    case 'email':
      reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      rule.msg = '邮箱';
      break
    case 'amout':
      reg = /^\d+\.?\d{0,2}$/;
      rule.msg = '保留两位小数的金额';
      break;
    case 'IDcard':
      reg = /^((\d{17}([0-9]|X|x))?(\d{14}([0-9]|X|x)))$/;
      rule.msg = '身份证位数';
      return checkCertificatesNo(val);
    default:
      break;
  }

  rule.msg = rule.msg + (str.match(reg) ? '匹配' : '不匹配');
  rule.status = !!str.match(reg);
  
  return rule;
}

function checkCertificatesNo (value, callback){
  var msg = {
    gender: Number(value.substr(16, 1)) % 2 == 0 ? 'male' : 'female', //获取性别
    birDate: value.substr(6, 8).replace(/(.{4})(.{2})/, "$1-$2-"), //获取生日信息
    success: true,
    errorMsg: '',
  }; 
  var birth = cheakBirthDay(msg);
  var parity = checkParity(value);

  if (birth.success === false) {
    return msg;
  }

  //身份证校验位验证
  if (parity.success === false) {
      msg.success = false;
      msg.errorMsg = '您的身份证校验位不正确,请重新输入';
  }
  return msg;
};

function cheakBirthDay (msg) {
  var birthday = msg.birDate.split("-");
  var year = Number(birthday[0]);
  var month = Number(birthday[1]);
  var date = Number(birthday[2]);
  var modalYeay = new Date().getFullYear();
  var age = modalYeay - year;
  var odd = !!(month % 2);  //奇数月份

  if (month > 12 || month == 0) {
      msg.success = false;
      msg.errorMsg = '身份证月份不正确';
  }
  if (date > 31) {
      msg.success = false;
      msg.errorMsg = '身份证日期不能大于31';
  }
  if (month == 2) {
      if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
          if (date > 29) {
              msg.success = false;
              msg.errorMsg = '闰年二月日期不能大于29日';
          }
      } else {
          if (date > 28) {
              msg.success = false;
              msg.errorMsg = '非闰年二月日期不能大于28日';
          }
      }
  } else if (month >= 8) {
      if (odd && date > 30) {
          msg.success = false;
          msg.errorMsg = month + '月没有' + date + '日';
      }
  } else {
      if (!odd && date > 30) {
          msg.success = false;
          msg.errorMsg = month + '月没有' + date + '日';
      }
  }  
}

function checkParity(card){
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if(len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i, valnum;
        for(i = 0; i < 17; i ++)  {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
}

function changeFivteenToEighteen (card){
    if(card.length == '15') {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    var cardTemp = 0, i;
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
    for (i = 0; i < 17; i ++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
    }
    card += arrCh[cardTemp % 11];
    return card;
    }
    return card;
}

console.log(checkCertificatesNo('511102199312350021'))