# JS 常用函数工具

## 时间范围计算

* 可以计算出 “本年”、 “本月”， “本周”的时间范围
* 使用
```js
/** rangeTye
 * 'year' 
 * 'mouth'
 * 'week'
 **/
setDateRange(rangeType);
```

## object 深克隆

克隆一个 js 对象.

```js
deepClone(obj);
```

## 获取 url 参数

```js
getUrlParam(name);
```

## 验证

* 自定义正则验证 `regVerify(reg)`

* 验证正整数： `verify.number(value)`

* 验证电话号码： `verify.phone(val)`

* 验证电子邮件： `verify.email(val)`

* 验证身份证： `verify.idCard(val)`

* 验证日期： `verify.date(val)`

* 验证保留两位小数的金额： `verify.amout(val)`

