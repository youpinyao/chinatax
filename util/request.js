const request = require('request');
const chalk = require('chalk');
const Promise = require('promise');
const BufferHelper = require('bufferhelper');
const iconv = require('iconv-lite');

module.exports = {
  post,
  get,
  send,
  success,
  error,
  parseJsonp,
}

function parseJsonp(key, data) {
  data = data.split(key + '(')[1];
  data = data.split(')')[0];
  data = JSON.parse(data);
  return data;
}

function success(response, data) {
  const defaultData = {
    success: true,
    content: data || '',
  }

  send(response, 200, defaultData);
}

function error(response, data) {
  const defaultData = {
    success: false,
  }

  if (typeof data !== 'object') {
    defaultData.message = data;
  } else {
    Object.assign(defaultData, data);
  }

  send(response, 400, defaultData);
}

function send(response, status, data) {
  response.append('Content-Type', 'application/json; charset=gbk');
  response.status(status).send(JSON.stringify(data));
}

function get(options) {
  if (typeof options === 'string') {
    const uri = options;

    options = {
      uri,
    }
  }
  if (options.url) {
    options.uri = options.url;
    delete options.url;
  }

  const data = options.data || options.body || option.form;
  const dataArr = [];

  data._ = +new Date();

  Object.keys(data).forEach(d => {
    dataArr.push(`${d}=${data[d]}`);
  });

  options.uri = `${options.uri}?${dataArr.join('&')}`;
  options.method = 'GET';

  delete options.body;
  delete options.data;
  delete options.form;

  return http(options);
}

function post(options) {
  if (typeof options === 'string') {
    const uri = options;

    options = {
      uri,
    }
  }

  if (options.url) {
    options.uri = options.url;
    delete options.url;
  }

  options.method = 'POST';

  return http(options);
}

function http(options) {
  options.rejectUnauthorized = false;
  options.resolveWithFullResponse = true;

  console.log();
  console.log(`${options.method}: `, chalk.yellow(JSON.stringify(options)));
  console.log();

  const promise = new Promise((resolve, reject) => {
    request(options).on('response', function (res) {

      let bufferHelper = new BufferHelper();

      res.on('data', function (chunk) {
        bufferHelper.concat(chunk);
      });
      res.on('end', function () {
        const result = iconv.decode(bufferHelper.toBuffer(), 'GBK');

        console.log('RESPONSE: ', result);
        resolve(result);
      });
    });
  });
  return promise;
}
