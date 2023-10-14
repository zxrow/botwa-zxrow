const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require('axios')
const _url = require('url')

exports.mediafire = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const judul = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').text();
				const size = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(1) > span').text();
				const upload_date = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
				const link = $('#downloadButton').attr('href')
				const hsil = {
					judul: link.split('/')[5],
					upload_date: upload_date,
					size: size,
					mime: link.split('/')[5].split('.')[1],
					link: link
				}
				resolve(hsil)
			})
			.catch(reject)
	})
}
exports.artinama = (query) => {
	return new Promise((resolve, reject) => {
		queryy = query.replace(/ /g, '+')
		axios.get('https://www.primbon.com/arti_nama.php?nama1=' + query + '&proses=+Submit%21+')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = $('#body').text();
				const result2 = result.split('\n      \n        \n        \n')[0]
				const result4 = result2.split('ARTI NAMA')[1]
				const result5 = result4.split('.\n\n')
				const result6 = result5[0] + '\n\n' + result5[1]
				resolve(result6)
			})
			.catch(reject)
	})
}