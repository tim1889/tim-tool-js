/**
 * cheakBirthDay
 * (date) YYYY-MM-DD
 */

function cheakBirthDay (date) {
  var birthday = date.split("-");
  var year = Number(birthday[0]);
  var month = Number(birthday[1]);
  var day = Number(birthday[2]);
  var odd = !!(month % 2);  //奇数月份
  var msg = {
    success: true,
    errorMsg: '',
  };

  if (year === 0 || month === 0 || day === 0) {
    msg.success = false;
    msg.errorMsg = '年月日不能为0';
    return msg;
  }

  if (month > 12) {
    msg.success = false;
    msg.errorMsg = '月份不正确';
    return msg;
  } else if (month === 2) {
    if (((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)) {
      if (day > 29) {
        msg.success = false;
        msg.errorMsg = '闰年 2 月日期不大于 29 日';
      }
    } else {
      if (day > 28) {
        msg.success = false;
        msg.errorMsg = '非闰年 2 月日期不大于 28 日';
      }
    }
  } else if (odd && day > 30) {
    msg.success = false;
    msg.errorMsg = month + ' 月没有 ' + day + ' 日';
  } else if (!odd && day > 31) {
    msg.success = false;
    msg.errorMsg = month + ' 月没有 ' + day + ' 日';
  } 

  return msg;
}