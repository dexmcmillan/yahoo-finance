# Yahoo Finance Unofficial API

A very simple and untested function for scraping stock info from Yahoo Finance. Built on Axios/Cheerio.

The function is called with

```javascript
getStockInfo(ticker, exchange)
```

For example...

```javascript
getStockInfo("TD", "TO")
```

returns an object like...

```javascript
{
  'Previous Close': '82.12',
  'Open': '82.29',
  'Bid': '82.80 x 0',
  'Ask': '82.92 x 0',
  "Day's Range": '82.29 - 82.91',
  '52 Week Range': '53.19 - 83.65',
  'Volume': '2,377,810',
  'Avg. Volume': '6,491,351',
  'Market Cap': '150.715B',
  'Beta (5Y Monthly)': '0.87',
  'PE Ratio (TTM)': '12.57',
  'EPS (TTM)': '6.59',
  'Earnings Date': 'May 27, 2021',
  'Forward Dividend & Yield': '3.16 (3.81%)',
  'Ex-Dividend Date': 'Apr. 08, 2021',
  '1y Target Est': '82.38',
  'holders': {
    '% of Shares Held by All Insider': '0.05%',
    '% of Shares Held by Institutions': '56.11%',
    '% of Float Held by Institutions': '56.14%',
    'Number of Institutions Holding Shares': '883'
  }
}
```

The property "% of Shares Held by All Insider" can be returned using the method insiders() method.

```javascript
getStockInfo("TD", "TO").insiders()
```
which returns...

```javascript
"0.05%"
```
