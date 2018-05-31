/** rangeTye
 * 'year' 
 * 'mouth'
 * 'week'
 **/

function setDateRange (rangeType) { 
  var date = new Date();
  var year = date.getFullYear();
  var mouth = date.getMonth() + 1;
  var day = date.getDate();
  var week = date.getDay();
  var start = '';
  var endDate = '';
  if (rangeType === 'year') {
      startDate = year + '-01-01';
      endDate = year + '-12-31';
  } else if (rangeType === 'month') {
      var endDay = filterEndDay();
      startDate = year + '-' + mouth + '-01';
      endDate = year + '-' + mouth + '-' + endDay;
  } else if (rangeType === 'week') {
    var start = date.getTime() - ((week - 1) * 24 * 60 * 60 * 1000);
    var end = date.getTime() + ((7 - week) * 24 * 60 * 60 * 1000);
    var newStartDate = new Date();
    var newEndDate = new Date();
    newStartDate.setTime(start);
    newEndDate.setTime(end);
    startDate = year + '-' + (newStartDate.getMonth() + 1) + '-' + newStartDate.getDate(start);
    endDate = year + '-' + (newEndDate.getMonth() + 1) + '-' + newEndDate.getDate();  
  }
  return {
    startDate: startDate,
    endDate: endDate,
  };    
}

function filterEndDay () {
    if (mouth === 2 || mouth === 4 || mouth === 6 || mouth === 9 || mouth === 11) {
        return 30;
    } else if (mouth === 2) {
        return (year%4 === 0 && year%100 !== 0)||(year%100 === 0 && year%400 === 0) ? 29 : 28;
    } else {
        return 31;
    }
}   

