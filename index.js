const axios = require('axios');
const cheerio = require('cheerio');

async function getStockInfo(ticker, exchange) {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get('https://ca.finance.yahoo.com/quote/'+ticker+'.'+exchange+'?p='+ticker+'.'+exchange+'&.tsrc=fin-srch');
      const holders = await axios.get('https://ca.finance.yahoo.com/quote/' + ticker + '.' + exchange + '/holders?p=' + ticker + '.' + exchange + '')
      const transactions = await axios.get('https://ca.finance.yahoo.com/quote/' + ticker + '.' + exchange + '/insider-transactions?p=' + ticker + '.' + exchange + '')

      let $ = await cheerio.load(html.data);

      const info = {
        ticker: ticker,
        exchange: exchange,
        insider_transactions: [],
        insiders: function() {
          return this.holders['% of Shares Held by All Insider'];
        },

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

      $ = await cheerio.load(transactions.data);



      $('table.BdB > tbody:nth-child(2) > tr').each((i, elem) => {
        const transaction = {
          name: "",
          title: "",
          transaction: "",
          type: "",
          value: "",
          date: "",
        }

        transaction.name = $(elem).find('td:nth-child(1) > p > a').text().toString()
        transaction.title = $(elem).find('td:nth-child(1) > p').text().toString().replace(transaction.name, "")
        transaction.transaction = $(elem).find('td:nth-child(2)').text().toString()
        transaction.type = $(elem).find('td:nth-child(3)').text().toString()
        transaction.value = $(elem).find('td:nth-child(4)').text().toString()
        transaction.date = $(elem).find('td:nth-child(5)').text().toString()

        info.insider_transactions.push(transaction)
      });

      return resolve(info)
    } catch {
      console.log("Error!")
    }

  })

}

module.exports.getStockInfo = getStockInfo
