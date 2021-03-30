const axios = require('axios');
const cheerio = require('cheerio');

async function getStockInfo(ticker, exchange) {
  return new Promise(async (resolve, reject) => {
    const html = await axios.get('https://ca.finance.yahoo.com/quote/'+ticker+'.'+exchange+'?p='+ticker+'.'+exchange+'&.tsrc=fin-srch');
    const holders = await axios.get('https://ca.finance.yahoo.com/quote/' + ticker + '.' + exchange + '/holders?p=' + ticker + '.' + exchange + '')

    let $ = await cheerio.load(html.data);

    const info = {
      ticker: ticker,
      exchange: exchange,
      insiders: function() {
      return this.holders['% of Shares Held by All Insider'];
    }
    }

    $('#quote-summary tr').each((i, elem) => {
      const theKey = $(elem).find('td:nth-child(1)').text().toString()
      const value = $(elem).find('td:nth-child(2)').text()

      info[theKey] = value
    });


    $ = await cheerio.load(holders.data);

    info.holders = {}

    $('section > div:nth-child(2) > div:nth-child(2) tr').each((i, elem) => {
      const theKey = $(elem).find('td:nth-child(2)').text().toString()
      const value =  $(elem).find('td:nth-child(1)').text()

      info.holders[theKey] = value
    });

    return resolve(info)
  })

}

module.exports.getStockInfo = getStockInfo
