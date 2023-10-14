const fs = require('fs')
const chalk = require('chalk')

global.domain = "https://zefta.storepanel.biz.id/" // Isi Domain Lu
global.apikey = 'ptla_u4Q3mNzKGYs7GPC8773UEuIABa7vY56rKuw2afajcWc' // Isi Apikey Plta Lu
global.capikey = 'ptlc_UmAOKHhXTfRoNk1Y8Fiotqh6IMvkXalty3MvJpnG7bF' // Isi Apikey Pltc Lu
global.facebook = ('./scrap/facebook')//installfbvideo
global.creAtor = "6289655478810@s.whatsapp.net"
global.owner = ['6289655478810']
global.ownerNumber = ["6289655478810@s.whatsapp.net"]
global.nomerOwner = "6289655478810"
global.namabotnya = 'agung SEND PANEL'
global.namaownernya = 'agungDev'
global.packname = '© By agung!'
global.author = 'Subscribe : zxagung x'
global.sessionName = 'session'
global.email = '-'
global.group = 'https://chat.whatsapp.com/Jo1e9qSMtdP8uYlqHY9u33'
global.keyopenai = "-"
global.youtube = 'https://youtube.com/'
global.website = 'https://zxagungblog.rf.gd'
global.github = 'https://github.com/zxrow'
global.lolhuman = '-'
global.zeeofckey = '-'
global.xznkey = '-'
global.nomorowner = 'https://wa.me/-'
global.region = 'I`m From Indonesia'
global.prefa = ['','!','.','#','-','•']
global.mess = 
{
success: '```Success✅```',
admin: '```Fitur Khusus Admin Group!!!```',
botAdmin: '```Bot Harus Menjadi Admin Terlebih Dahulu!!!```',
owner: '```Fitur Khusus Owner Bot!!!```',
group: '```Fitur Digunakan Hanya Untuk Group!!!```',
private: '```Fitur Digunakan Hanya Untuk Private Chat!!!```',
bot: '```Fitur Khusus Pengguna Nomor Bot!!!```',
error: '```Mungkin Lagi Error Kak Harap Lapor Owner Biar Langsung Di Benerin🙏```',
wait: '```Waittt...```'
}

global.thumb = fs.readFileSync('./image/thumb.jpg')
global.imagekir = fs.readFileSync('./image/agung.jpg')
global.videokir = fs.readFileSync('./image/agung.mp4')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
