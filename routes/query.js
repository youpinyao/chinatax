const request = require('../util/request.js');
const config = require('../config.js');
const domain = require('../util/domain.js');

module.exports = function (app) {
  app.get('/query', (req, res) => {

    // request.success(res, {
    //   "key1": "001",
    //   "key2": "N▽福建省福州市鼓楼区软件大道89号福州软件园F区1号楼24层2401-1 18559102571▽0▽20170717▽91350104MA4XT7G169▽中国工商银行股份有限公司福州洪山支行1402029109601064450▽9135020007937301XB▽厦门市软件园二期观日路22号102室G03单元 0592-5966070▽46157095680268020024▽中国建设银行股份有限公司厦门科技支行 35101504001052504342▽731.0▽▽696.11▽ ▽厦门美柚信息科技有限公司▽福州迈向创新信息咨询有限公司▽-432.11▽661621524438",
    //   "key3": "培□训□费□█ █ █ █ █1163.11█3█34.89",
    //   "key4": "hbqh9RiGjqlIIxg7ZTMb1YwSq5zrYwnDAPVs3vYqrELJaC9JQ7i+wOUPK9DthoSD",
    //   "key5": "var fpxx=fpdm+'≡'+fphm+'≡'+swjgmc+'≡'+jsonData.key2+'≡'+yzmSj",
    //   "key6": "var result={\"template\":0,\"fplx\":fplx,\"fpxx\":fpxx,\"hwxx\":hwxx,\"jmbz\":jmbz,\"sort\":jmsort}",
    //   "key7": "d76fe7d2f6092872a2dea2f934e7b8ed",
    //   "key8": "a1aeea18b68808e35f90f68528efd4f9",
    //   "key9": "213f003599b2a420e4602bbe6bdf5f03",
    //   "key10": "hTj6wBw2ZRQx0o+46KktqdeFPG1harBC6eBejERFs2d4VJ2oZGQ8xfEKTx92xbBZ",
    //   "key11": "dc1de"
    // })

    // console.log(iconv.convert(`���й��������йɷ����޹�˾���ſƼ�֧�� 35101504001052504342��731.0����696.11�� ������������Ϣ�Ƽ����޹�˾����������������Ϣ��ѯ���޹�˾��-432.11��661621524438","key3":"����ѵ���ѡ��� �� �� �� ��1163.11��3��34.89","key4":"56FzYGU4Qc6YZn6HMl1VnwbszQqzNYhxeYx8O0PzK06gSkWaP9ZG14Dt8sVkaZ4u","key5":"var fpxx=fpdm+'��'+fphm+'��'+swjgmc+'��'+jsonData.key2+'��'+yzmSj","key6":"var result={\"template\":0,\"fplx\":fplx,\"fpxx\":fpxx,\"hwxx\":hwxx,\"jmbz\":jmbz,\"sort\":jmsort}","key7":"05fba840ed73f644b89b3898ae8de852","key8":"7d080d36ce0378025b277aa87ccbcaa1","key9":"d8c2b6f3634254411afde25e0cf3620a","key10":"OhOC9pUomncgVPTcCY0h3nQXfOIGoYZVhT0vRu6kl3kQm9EJG/4fHO7AGHNar7UG","key11":"dc1de"}}`));

    const callback = 'jQuery' + (+new Date());
    const domainInfo = domain.get(req.query.fpdm, 1);

    request.get({
      url: domainInfo.origin + config.urls.query,
      body: Object.assign({
        callback,
      }, req.query),
    }).then(data => {
      try {
        data = request.parseJsonp(callback, data);

        request.success(res, data);
      } catch (e) {
        request.error(res, '格式化错误请重新请求');
      }
    }, function (e) {
      request.error(res, e.message);
    });
  });
}
