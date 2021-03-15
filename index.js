// @ts-ignore
const rawData = [

  { currency: 'EUR', summ: 400, date: '2020-03-30' },

  { currency: 'EUR', summ: 500, date: '2020-02-20' },

  { currency: 'EUR', summ: 458, date: '2020-01-31' }

]
const totalEarned = rawData.reduce((total, income) => total + income.summ, 0)

const axios = require('axios')
const cheerio = require('cheerio')

let kursValut = ''
let totalEarnedUAH = 0
let fullLog
axios

  .get('https://minfin.com.ua/ua/currency/')
  .then(response => {
    const html = response.data

    const $ = cheerio.load(html)

    const scrapedata = $('.mfcur-nbu-full-wrap').text()

    kursValut = scrapedata.split('\n')[6]
    totalEarnedUAH = totalEarned * parseInt(kursValut)
    const tax5percent = Math.round(totalEarnedUAH * 0.05)
    fullLog = {
      totalEarned: totalEarned,
      totalEarnedUAH: totalEarnedUAH,
      tax5percent: tax5percent,
      rawData: rawData
    }
    console.log(fullLog)
  })
  // handling error
  .catch((error) => {
    console.log(error)
  })
