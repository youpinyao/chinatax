const request = require('../util/request.js');
const config = require('../config.js');
const domain = require('../util/domain.js');
const tips = {
  '00': '全部',
  '01': '红色',
  '02': '黄色',
  '03': '蓝色',
};

// 代码 3502164130
// 编号 01324311
// 日期 20170713
// 不含税金额 2169.81
module.exports = function (app) {
  app.get('/validcode', (req, res) => {
    const callback = 'jQuery' + (+new Date());
    const domainInfo = domain.get(req.query.fpdm, 0);

    request.get({
      url: domainInfo.origin + config.urls.validCode,
      body: Object.assign({
        callback,
      }, req.query),
    }).then(data => {
      try {
        data = request.parseJsonp(callback, data);

        data.picture = `data:image/png;base64,${data.key1}`;
        data.tip = tips[data.key4];
        data.yzmSj = data.key2;
        data.index = data.key3;

        delete data.key1;
        delete data.key2;
        delete data.key3;
        delete data.key4;

        request.success(res, data);
      } catch (e) {
        request.error(res, '格式化错误请重新请求');
      }
    }, function (e) {
      request.error(res, e.message);
    });
  });
}
