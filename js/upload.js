function getFormDate (urls) {
  var files = this.$refs.file.files;
  for (var j = 0 , len = files.length ; j < len ; j ++) {
      var file = files[j];
      var urls = this.form.SignImgUrlList;
      // if (urls.length + j + 1 > 50) {
      //     this.$message({
      //         message: '照片凭证图片小于等于 50 张',
      //         type: 'warning'
      //     });
      //     this.$refs.file.value = '';
      //     return false;
      // }

      for (var i = 0; i < urls.length; i++) {
          if (urls[i].indexOf(file.name) >= 0) {
              this.$message({
                  message: '不能上传相同名字的图片',
                  type: 'warning'
              });
              this.$refs.file.value = '';
              return false;
          }
      }
      var formData = new FormData();
      var isJPG = file.type === 'image/jpeg';
      var isLt2M = file.size / 1024 / 1024 < 2;
      formData.append('key', this.createGuid(8, 16) + '.' + file.name);
      // formData.append('token', this.token);
      formData.append('file', file);
      return formData;
  }
  this.$refs.file.value = '';
}

function createGuid (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
      i;
  radix = radix || chars.length;
  if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
      }
  }
  return uuid.join('');
}