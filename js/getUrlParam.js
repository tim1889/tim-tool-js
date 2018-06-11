/* getUrlParam 
  * name 
  * 参数名
**/

function getUrlParam (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) { return unescape(r[2]); }
  return null;
}