let validcodeData = {};

$('#validCodeButton').on('click', e => {
  const fpdm = $('input[name="fpdm"]').val();

  $.ajax({
    method: 'GET',
    url: '/validcode',
    data: {
      fpdm,
      r: Math.random(),
    },
    success: function (data) {
      data = data.content;

      $('#tip').html(data.tip);
      $('#validCode').attr('src', data.picture);

      validcodeData = data;
    },
    error: function (data) {
      console.log(data);
    }
  })
});

$('#fpdm').bind('blur', checkType).bind('keyup', checkType);
checkType.call($('#fpdm'));

function checkType() {
  const fpdm = $(this).val();
  const fplx = alxd(fpdm);

  let text = '开具金额(不含税)：';

  if (fplx == '01') {
    text = '开具金额(不含税)：';
  } else if (fplx == '02') {
    text = '合计金额：';
  } else if (fplx == '03') {
    text = '不含税价：';
  } else if (fplx == '04' || fplx == '10' || fplx == '11') {
    text = '校验码后六位：';
  }
  $('#fpjeLabel').html(text);
}


$('#submit').on('click', e => {
  const fpdm = $('input[name="fpdm"]').val();
  const fphm = $('input[name="fphm"]').val();
  const kprq = $('input[name="kprq"]').val();
  const fpje = $('input[name="fpje"]').val();
  const yzm = $('input[name="yzm"]').val();
  const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  const fplx = alxd(fpdm);

  const data = {
    fpdm,
    fphm,
    kprq,
    fpje,
    yzm,
    iv,
    salt,
    fplx,
    index: validcodeData.index,
    yzmSj: validcodeData.yzmSj,
  };

  $.ajax({
    method: 'GET',
    url: '/query',
    data,
    success: function (result) {
      const ret = convertQuery(result.content ,data, function(finallyData){
        $('#errorTip').html(JSON.stringify(finallyData));
      });
      if(typeof ret === 'string'){
        $('#errorTip').html(ret);
      }
    },
    error: function (data) {
      console.log(data);
    }
  })
});
