require('./agungsettings')
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const cheerio = require('cheerio')
const yts = require('yt-search')
const fsx = require('fs-extra')
const hxz = require('hxz-api')
const ytdl = require('ytdl-core')
const moment = require('moment-timezone')
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const hariiini = moment.tz('Asia/Jakarta').format('DD MMMM YYYY')
const { JSDOM } = require('jsdom')
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { UploadFileUgu, webp2mp4File, TelegraPh } = require("./lib/uploader")
const { Primbon } = require("scrape-primbon")
const { TelegraPH } = require("./lib/TelegraPH")
const agung2 = require('./scrap/mediafire')
const { remini } = require('./lib/remini')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')
const addusrp = JSON.parse(fs.readFileSync('./database/user.json'))

module.exports = agung = async (agung, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const full_args = body.replace(command, '').slice(1).trim()
const pushname = m.pushName
const botNumber = await agung.decodeJid(agung.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')

const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await agung.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isImage = m.mtype === "imageMessage"
const isQuotedImage = m.mtype === "extendedTextMessage" && content.includes("imageMessage")
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
	
if (!agung.public) {
if (!m.key.fromMe) return
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
		
try {
ppuser = await agung.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}
//TicTacToe
    this.game = this.game ? this.game : {}
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
    if (room) {
    let ok
    let isWin = !1
    let isTie = !1
    let isSurrender = !1
    // m.reply(`[DEBUG]\n${parseInt(m.text)}`)
    if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text)) return
    isSurrender = !/^[1-9]$/.test(m.text)
    if (m.sender !== room.game.currentTurn) { // nek wayahku
    if (!isSurrender) return !0
    }
    if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
    m.reply({
    '-3': 'Game telah berakhir',
    '-2': 'Invalid',
    '-1': 'Posisi Invalid',
    0: 'Posisi Invalid',
    }[ok])
    return !0
    }
    if (m.sender === room.game.winner) isWin = true
    else if (room.game.board === 511) isTie = true
    let arr = room.game.render().map(v => {
    return {
    X: '❌',
    O: '⭕',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    }[v]
    })
    if (isSurrender) {
    room.game._currentTurn = m.sender === room.game.playerX
    isWin = true
    }
    let winner = isSurrender ? room.game.currentTurn : room.game.winner
    let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} Menang!` : isTie ? `Game berakhir` : `Giliran ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}

Ketik *nyerah* untuk menyerah dan mengakui kekalahan`
    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== from)
    room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = from
    if (room.x !== room.o) await agung.sendText(room.x, str, m, { mentions: parseMention(str) } )
    await agung.sendText(room.o, str, m, { mentions: parseMention(str) } )
    if (isTie || isWin) {
    delete this.game[room.id]
    }
    }
    //Suit PvP
    this.suit = this.suit ? this.suit : {}
    let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
    if (roof) {
    let win = ''
    let tie = false
    if (m.sender == roof.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
    if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
    agung.sendTextWithMentions(from, `@${roof.p2.split`@`[0]} menolak suit, suit dibatalkan`, m)
    delete this.suit[roof.id]
    return !0
    }
    roof.status = 'play'
    roof.asal = from
    clearTimeout(roof.waktu)
    //delete roof[roof.id].waktu
    agung.sendText(from, `Suit telah dikirimkan ke chat

@${roof.p.split`@`[0]} dan 
@${roof.p2.split`@`[0]}

Silahkan pilih suit di chat masing"
klik https://wa.me/${botNumber.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })
    if (!roof.pilih) agung.sendText(roof.p, `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`, m)
    if (!roof.pilih2) agung.sendText(roof.p2, `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`, m)
    roof.waktu_milih = setTimeout(() => {
    if (!roof.pilih && !roof.pilih2) agung.sendText(from, `Kedua pemain tidak niat main,\nSuit dibatalkan`)
    else if (!roof.pilih || !roof.pilih2) {
    win = !roof.pilih ? roof.p2 : roof.p
    agung.sendTextWithMentions(from, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} tidak memilih suit, game berakhir`, m)
    }
    delete this.suit[roof.id]
    return !0
    }, roof.timeout)
    }
    let jwb = m.sender == roof.p
    let jwb2 = m.sender == roof.p2
    let g = /gunting/i
    let b = /batu/i
    let k = /kertas/i
    let reg = /^(gunting|batu|kertas)/i
    if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
    roof.pilih = reg.exec(m.text.toLowerCase())[0]
    roof.text = m.text
    m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ''}`)
    if (!roof.pilih2) agung.sendText(roof.p2, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
    }
    if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
    roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
    roof.text2 = m.text
    m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih ? `\n\nMenunggu lawan memilih` : ''}`)
    if (!roof.pilih) agung.sendText(roof.p, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
    }
    let stage = roof.pilih
    let stage2 = roof.pilih2
    if (roof.pilih && roof.pilih2) {
    clearTimeout(roof.waktu_milih)
    if (b.test(stage) && g.test(stage2)) win = roof.p
    else if (b.test(stage) && k.test(stage2)) win = roof.p2
    else if (g.test(stage) && k.test(stage2)) win = roof.p
    else if (g.test(stage) && b.test(stage2)) win = roof.p2
    else if (k.test(stage) && b.test(stage2)) win = roof.p
    else if (k.test(stage) && g.test(stage2)) win = roof.p2
    else if (stage == stage2) tie = true
    agung.sendText(roof.asal, `_*Hasil Suit*_${tie ? '\nSERI' : ''}

@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Menang \n` : ` Kalah \n`}
@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Menang \n` : ` Kalah \n`}
`.trim(), m, { mentions: [roof.p, roof.p2] })
    delete this.suit[roof.id]
    }
    }
    async function tiktokdl(url) {
    try {
const tokenn = await axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
let a = cheerio.load(tokenn.data);
let token = a("#token").attr("value");
const param = {
    url: url,
    token: token,
};
const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
method: "post",
data: new URLSearchParams(Object.entries(param)),
headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
},
    }
);
return {
    status: 200,
    title: data.title,
    thumbnail: data.thumbnail,
    duration: data.duration,
    media: data.medias,
};
    } catch (e) {
return e
    }
}
//━━━━━━━━━━━━━━━[ FAKE FAKE ]━━━━━━━━━━━━━━━━━//
const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': 'agungDev', 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;agungDev;;;\nFN:agungev\nitem1.TEL;waid=6289655478810:6289655478810\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb,sendEphemeral: true}}}
const reply = (teks) => {
agung.sendMessage(m.chat, { text: teks ,
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}
}, { quoted : repPy })
}
//HAYO MAU NGAPAIN//
const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: `${global.namabot}`,
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: `${global.namabot}`
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
//=================================================//
//━━━━━━━━━━━━━━━[ DIWNLOAD YTMP3 ]━━━━━━━━━━━━━━━━━//
const downloadMp4 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp4File = getRandom('.mp4')
console.log(color('Download Video With ytdl-core'))
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on('finish', async () => {
await agung.sendMessage(m.chat, { video: fs.readFileSync(mp4File), caption: mess.succes, gifPlayback: false }, { quoted: m })
fs.unlinkSync(`./${mp4File}`)
})
} catch (err) {
m.reply(`${err}`)
}
}


//RPGGAMES

//=================================================//
//=================================================//

const downloadMp3 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp3File = getRandom('.mp3')
console.log(color('Download Audio With ytdl-core'))
ytdl(Link, { filter: 'audioonly' })
.pipe(fs.createWriteStream(mp3File))
.on('finish', async () => {
await agung.sendMessage(m.chat, { audio: fs.readFileSync(mp3File), mimetype: 'audio/mp4' }, { quoted: m })
fs.unlinkSync(mp3File)
})
} catch (err) {
m.reply(`${err}`)
}
}
async function sendagungMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await agung.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
//━━━━━━━━━━━━━━━[ BATAS FAKE ]━━━━━━━━━━━━━━━━━//
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}
function monospace(string) {
return '```' + string + '```'
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

global.addUserPanel = (email, username, expired, _db) => {
var obj_add = {
email: email,
username: username,
expired: expired
}
_db.push(obj_add)
fs.writeFileSync('./database/user.json', JSON.stringify(_db, null, 3))
}

switch (command) {
//━━━━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━━━━━━//
case 'menu': {
let menu = `
*┌ Bot Name* : *ZXBOT*
*│ Version* : *2*
*│ Language* : *NodeJs*
*└ Baileys* : *@adiwashing/baileys*

*L I S T - M E N U*
*┌ ◦ .bayar*
*│ ◦ .ownermenu*
*│
*—  D O W N L O A D M E N U ッ*  
*│ ◦ .play*
*│ ◦ .play2*
*│ ◦ .ytmp3 [link]*
*│ ◦ .ytmp4 [link]*
*│ ◦ .spotify*
*│ ◦ .spotifydl [link]*
*│ ◦ .tiktoksearch [query]*
*│ ◦ .tiktokmp4*
*│ ◦ .tiktokmp3 [link]*
*│ ◦ .fbdl [link]*
*—  M A K E R  M E N U ッ*
*│ ◦ .sticker*
*│ ◦ .qc [teks]*
*│ ◦ .attp [teks]*
*│ ◦ .styletext [teks]*
*│ ◦ .toimg*
*│ ◦ .emojimix*
*│ ◦ .tomp4*
*│ ◦ .toaudio*
*│ ◦ .tomp3*
*│ ◦ .togif*
*│ ◦ .tovn*
*│ ◦ .beautiful*
*│ ◦ .fire*
*│ ◦ .jail*
*│ ◦ .brazzers*
*│ ◦ .triggered*
*│ ◦ .postig*
*│ ◦ .tourl*
*│ ◦ .speak*
*│ ◦ .smeme*
*—  G A M E  M E N U ッ*
*│ ◦ .ttc*
*│ ◦ .delttc*
*│ ◦ .suitpvp*
*—  I S L A M I C M E N U ッ*
*│ ◦ .kisahnabi*
*│ ◦ .asmaulhusna*
*│ ◦ .listsurah*
*│ ◦ .randomquran*
*│ ◦ .randomquran2*
*—  G R O U P  M E N U ッ*
*│ ◦ .pushkontakv2*
*—  S E A R C H  M E N U ッ*
*│ ◦ .infogempa*
*│ ◦ .infocuaca*
*│ ◦ .ai*
*│ ◦ .aimage*
*│ ◦ .lirik [query]
*│ ◦ .stalktiktok [query]
*│ ◦ .pinterest [query]*`
m.reply(`HI ${pushname} hallo ngaf😁👋\n\n` + menu + `\n\n${runtime(process.uptime())}`)
}
break
case 'fbdl':
if (args.length == 0) return m.reply(`Example: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
axios.get(`https://api.lolhuman.xyz/api/facebook?apikey={global.lolhuman}&url=${args[0]}`).then(({ data }) => {
agung.sendMessage(from, { video: { url: data.result }, mimetype: 'video/mp4' })
})
break
case 'ig2': {
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *url*`)
reply(mess.wait)
try{
let anu = await fetchJson(`https://xzn.wtf/api/igdl?url=${text}&apikey={global.xznkey}`)
agung.sendMessage(m.chat, { video: { url: anu.media}, caption: `Done Sayang >///<`}, {quoted: m})
}catch (error) {
reply(`Sorry this video can't be download\n\nPlease try typing .ig3 *url*`);
}
}
break
case 'play2': case 'ytplay2':{
if (!text) return reply(`Example : ${prefix + command} Lagu sad`)
let search = await yts(`${text}`)
let caption = `*YOUTUBE PLAY*

あ ID : ${search.all[0].videoId}
あ Title : ${search.all[0].title}
あ Views : ${search.all[0].views}
あ Duration : ${search.all[0].timestamp}
あ Channel : ${search.all[0].author.name}
あ Upload : ${search.all[0].ago}
あ URL Video : ${search.videos[0].url}
あ Description : ${search.videos[0].description}

_Please wait, the audio file is being sent..._`
let todd = await getBuffer(search.all[0].image)
agung.sendMessage(m.chat, {image: todd, caption: caption}, {quoted:m})
let ply = search.videos[0].url
const ytdl = require('ytdl-core')
let mp3file = `./${m.chat}.mp3`
  let nana = ytdl(ply, { filter: 'audioonly' })
  .pipe(fs.createWriteStream(mp3file))
  .on('finish', async () => {
agung.sendMessage(m.chat, {audio: fs.readFileSync(mp3file), mimetype:'audio/mpeg' }, {quoted: m})
   })
}
break
case 'ytmp4': case 'mp4':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp4(text)
}
break
case 'play': case 'ytplay': {
if (!text) throw `Example : ${prefix + command} story wa anime`
let yts = require("yt-search")
let search = await yts(text)
let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
let buttons = [
{buttonId: `ytmp3 ${anu.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
{buttonId: `ytmp4 ${anu.url}`, buttonText: {displayText: '► Video'}, type: 1}
]
let buttonMessage = {
image: { url: anu.thumbnail },
caption: `
あ Title : ${anu.title}
あ Ext : Search
あ Id : ${anu.videoId}
🪀 Duration : ${anu.timestamp}
あ Viewers : ${anu.views}
あ Upload At : ${anu.ago}
あ Author : ${anu.author.name}
あ Channel : ${anu.author.url}
あ Description : ${anu.description}
あ Url : ${anu.url}`,
footer: agung.user.name,
buttons: buttons,
headerType: 4
}
agung.sendMessage(m.chat, buttonMessage, { quoted: m })
}
break
case 'ytmp4': case 'mp4':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp4(text)
}
break
case 'ytmp3': case 'mp3':{
if (!text) return m.reply('Masukan Link Nya!!!')
reply(mess.wait)
downloadMp3(text)
}
break
case 'spotify': {
let anu = await fetchJson(`https://spotifyku.my.id/search?query=${text}`)
let teks = `search from ${text}\n\n`
for (let i of anu.data) {
teks += `⭔ title: ${i.title}\n⭔ duration: ${i.duration}\n⭔ popularity: ${i.popularity}\n⭔ preview: ${i.preview}\n⭔ url: ${i.url}\n⭔ artist: ${i.artist}\n\n─────────────────\n\n`
}
agung.sendMessage(m.chat, { image: { url: anu.data[0].thumbnail }, caption: `${teks}` }, { quoted: fkontak })
}
break
case 'spotifydl': {
if (!text) throw `Example: ${prefix + command} username`
reply(mess.wait)
let buf = await getBuffer(`https://spotifyku.my.id/download?url=${text}`)
agung.sendMessage(m.chat, { audio: buf, mimetype: 'audio/mpeg' }, { quoted: m })
}
break
case "tiktokmp4": case 'tt': case 'ttnowm': case'tiktokwm': case'tiktoknowm': case'tiktok':{
if (!text) return reply(`Gunakan dengan cara ${prefix+command} *url*\n\n_Contoh_\n\n${prefix+command} https://vt.tiktok.com/ZS8KdFQcQ/`)
reply(mess.wait)
try{
let anu = await fetchJson(`https://xzn.wtf/api/tiktok?url=${text}&apikey={global.xznkey}`)
agung.sendMessage(m.chat, { video: { url: anu.data.play}, caption: `Done Sayang >///<`}, {quoted: m})
}catch (error) {
reply(`Sorry this video can't be download\n\nRequest failed with status code *400*`);
}
}
break
case "tiktokmp3": case 'ttmp3': case'tiktokaudio':{
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *url*\n\n_Contoh_\n\n${prefix+command} https://vt.tiktok.com/ZS8KdFQcQ/`)
reply(mess.wait)
let anu = await fetchJson(`https://xzn.wtf/api/tiktok?url=${text}&apikey={global.xznkey}`)
const aud = anu.data.music
agung.sendMessage(m.chat, {audio : {url : aud}, mimetype:'audio/mpeg'}, {quoted:m})
}
break
case 'tiktoksearch': case 'tiktoks': case 'ttsearch':{
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *query*\n\n_Contoh_\n\n${prefix + command} jj epep`)
reply(mess.wait)
try{
let anu = await fetchJson(`https://xzn.wtf/api/ttsearch?search=${text}&apikey={global.xznkey}`)
const capt = anu.title
const author = anu.author.nickname
agung.sendMessage(m.chat, { video: { url: anu.play}, caption: `💬 Caption : ${capt}\n👤 Author : ${author}`}, {quoted: m})
}catch (error) {
reply(`Sorry this video can't be download\n\nRequest failed with status code *400*`);
}
}
break
case 'speak':{
if (!text) return reply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix + command} Halo semuanya`)
await agung.sendPresenceUpdate('recording', m.chat);
var suara = await fetchJson(`https://xzn.wtf/api/tts-anime?text=${text}&lang=mix&voice=paimon&speed=0.65&symbol=y&apikey={global.xznkey}`)
agung.sendMessage(m.chat, {audio: {url: suara.data.url}, mimetype: 'audio/mpeg', ptt: true}, {quoted:m})
}
break
case 'brazzers': case 'triggered': case 'jail': case 'rip': case 'wanted': case 'fire': case 'beautiful':  case 'wasted':{
reply(mess.wait)
if (!quoted) return reply(`Fotonya Mana?`)
if (!/image/.test(mime)) return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`)
reply(mess.wait)
const media = await agung.downloadAndSaveMediaMessage(quoted)
const anu = await TelegraPH(media)
agung.sendMessage(m.chat, { image: { url: `https://api.zeeoneofc.my.id/api/image-effect/${command}?apikey={global.zeeofckey}&url=${anu}` }, caption: 'Done Ayang >///<'}, { quoted: m})
}
break
case 'postig': {
if (!quoted) return reply(`Fotonya Mana?`)
if (!/image/.test(mime)) return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`)
reply(mess.wait)
const media = await agung.downloadAndSaveMediaMessage(quoted)
const anu = await TelegraPH(media)
agung.sendMessage(m.chat, { image: { url: `https://api.zeeoneofc.my.id/api/image-effect/instagram2?apikey={global.zeeofckey}&url=${anu}` }, caption: 'Cie Fotonya Dipost Bot'}, { quoted: m})
}
break
case 'qc': {
const { quote } = require('./lib/quote.js')
            if (!q) return ('Masukan Text')
            let ppnyauser = await await agung.profilePictureUrl(m.sender, 'image').catch(_=> 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
            const rest = await quote(q, pushname, ppnyauser)
            reply(mess.wait)
            agung.sendImageAsSticker(m.chat, rest.result, m, { packname: `${global.packname}`, author: `${global.author}`})
            }
            break
        case 'attp': {
                try {
                if (args.length == 0) return reply(`Example: ${prefix + command} Henzz`)
                await agung.sendMessage(m.chat, {sticker: {url:`https://api.lolhuman.xyz/api/attp?apikey=${global.lolhuman}&text=${full_args}` }}, { quoted: m })
            } catch (e) {
                reply(mess.error)
            }
            }
            break
case 'style': case 'styletext': {
let { styletext } = require('./lib/scraper')
if (!text) throw 'Masukkan Query text!'
let anu = await styletext(text)
let teks = `Srtle Text From ${text}\n\n`
for (let i of anu) {
teks += `⭔ *${i.name}* : ${i.result}\n\n`
}
m.reply(teks)
}
break
case 'toimage': case 'toimg': {
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `Balas sticker dengan caption *${prefix + command}*`
let media = await agung.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
agung.sendMessage(from, { image: buffer }, { quoted:m })
fs.unlinkSync(ran)
})
}
break
case 'tomp4': 
	        case 'tovideo': {
                if (!/webp/.test(mime)) return reply(`Reply stiker dengan caption *${prefix + command}*`)
                reply(mess.wait)
                let media = await agung.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await agung.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)
                
            }
            break
            
            case 'toaud': 
            case 'toaudio': {
            if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Kirim/newReply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
            reply(mess.wait)
            let media = await agung.downloadMediaMessage(quoted)
            let audio = await toAudio(media, 'mp4')
            agung.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
            
            }
            break
            
            case 'tomp3': {
            if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Kirim/newReply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
            reply(mess.wait)
            let media = await agung.downloadMediaMessage(quoted)
            let audio = await toAudio(media, 'mp4')
            agung.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By zxagung`}, { quoted : m })
            
            }
            break
            
            case 'tovn': 
            case 'toptt': {
            if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`newReply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
            reply(mess.wait)
            let media = await agung.downloadMediaMessage(quoted)
            let { toPTT } = require('./lib/converter')
            let audio = await toPTT(media, 'mp4')
            agung.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
            
            }
            break
            
            case 'togif': {
                if (!/webp/.test(mime)) return reply(`Reply stiker dengan caption *${prefix + command}*`)
                reply(mess.wait)
                let media = await agung.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await agung.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                await fs.unlinkSync(media)
                
            }
            break
case "emojimix": {
if (!quoted) return m.reply(`*Ngetik Yg Bener Dek!!* ${prefix + command}`) 
let [emoji1, emoji2] = text.split`+`
if (!emoji1) return m.reply(`Example : ${prefix + command} 😅+🤔`) 
if (!emoji2) return m.reply(`Example : ${prefix + command} 😅+🤔`) 
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let encmedia = await agung.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
await fs.unlinkSync(encmedia)
}
}
break
case "tourl":{
if (isImage || isQuotedImage) {
const fileName = fs.readdirSync("./lib").length + 1
const media = await agung.downloadAndSaveMediaMessage(quoted, `./lib/${fileName}`)
const anu = await UploadFileUgu(media)
await m.reply(anu.url)
} else if (isVideo || isQuotedVideo) {
const fileName = fs.readdirSync("./lib").length + 1
const media = await agung.downloadAndSaveMediaMessage(quoted, `./lib/${fileName}`)
const anu = await UploadFileUgu(media)
await m.reply(anu.url)
} else if (isQuotedAudio) {
const fileName = fs.readdirSync("./lib").length + 1
const media = await agung.downloadAndSaveMediaMessage(quoted, `./lib/${fileName}`)
const anu = await UploadFileUgu(media)
await m.reply(anu.url)
} else if (isQuotedSticker) {
const fileName = fs.readdirSync("./lib").length + 1
const media = await agung.downloadAndSaveMediaMessage(quoted, `./lib/${fileName}`)
const anu = await UploadFileUgu(media)
await m.reply(anu.url)
} else m.reply(`Use photos/videos or Reply photos/videos/sticker/audio with captions ${prefix + command}`) 
}
break
case "smeme": case "stickermeme": case "stickmeme": {
if (!text) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks*`)
if (text.includes("|")) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks*`)
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks*`)
arg = args.join(" ")
mee = await agung.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(mee)
meme = `https://api.memegen.link/images/custom/-/${arg}.png?background=${mem}`
memek = await agung.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(memek)
}
break
	case"sticker":case"s":if(!quoted)return reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix + command}
Durasi Video 1-9 Detik`);if(/image/.test(mime))await fs.unlinkSync(await agung.sendImageAsSticker(m.chat,await quoted.download(),m,{packname:global.packname,author:global.footer}));else if(/video/.test(mime)){if((quoted.msg||quoted).seconds>11)return reply("Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik");await fs.unlinkSync(await agung.sendVideoAsSticker(m.chat,await quoted.download(),m,{packname:global.packname,author:global.footer}))}else reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix + command}
Durasi Video 1-9 Detik`)
break
case 'ttc': case 'ttt': case 'tictactoe': {
    let TicTacToe = require("../lib/tictactoe")
    this.game = this.game ? this.game : {}
    if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw 'Kamu masih didalam game'
    let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    if (room) {
    m.reply('Partner ditemukan!')
    room.o = from
    room.game.playerO = m.sender
    room.state = 'PLAYING'
    let arr = room.game.render().map(v => {
    return {
    X: '❌',
    O: '⭕',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    }[v]
    })
    let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Menunggu @${room.game.currentTurn.split('@')[0]}

Ketik *nyerah* untuk menyerah dan mengakui kekalahan`
    if (room.x !== room.o) await agung.sendText(room.x, str, m, { mentions: parseMention(str) } )
    await agung.sendText(room.o, str, m, { mentions: parseMention(str) } )
    } else {
    room = {
    id: 'tictactoe-' + (+new Date),
    x: from,
    o: '',
    game: new TicTacToe(m.sender, 'o'),
    state: 'WAITING'
    }
    if (text) room.name = text
    m.reply('Menunggu partner' + (text ? ` mengetik command dibawah ini ${prefix}${command} ${text}` : ''))
    this.game[room.id] = room
    }
    }
    break
case 'delttc': case 'delttt': {
    let roomnya = Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
    if (!roomnya) throw `Kamu sedang tidak berada di room tictactoe !`
    delete this.game[roomnya.id]
    m.reply(`Berhasil delete session room tictactoe !`)
    }
    break
case 'suitpvp': case 'suit': {
    this.suit = this.suit ? this.suit : {}
    let poin = 10
    let poin_lose = 10
    let timeout = 60000
    if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) m.reply(`Selesaikan suit mu yang sebelumnya`)
    if (m.mentionedJid[0] === m.sender) return m.reply(`Tidak bisa bermain dengan diri sendiri !`)
    if (!m.mentionedJid[0]) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @${owner[1]}`, from, { mentions: [owner[1] + '@s.whatsapp.net'] })
    if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`
    let id = 'suit_' + new Date() * 1
    let caption = `_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${m.mentionedJid[0].split`@`[0]} untuk bermain suit

Silahkan @${m.mentionedJid[0].split`@`[0]} untuk ketik terima/tolak`
    this.suit[id] = {
    chat: await agung.sendText(from, caption, m, { mentions: parseMention(caption) }),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
    if (this.suit[id]) agung.sendText(from, `_Waktu suit habis_`, m)
    delete this.suit[id]
    }, 60000), poin, poin_lose, timeout
    }
    }
    break
case "pushkontakv2":
if (!isCreator) return reply(`Lu Siapa Ngentot?Ini Cuman Khusus agung Sayang ku♥️`)
if (!text) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix + command} teks`)
await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_")
const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
agung.sendMessage(men, { text: text })
await sleep(2000)
}
reply("*SUCCESFUL ✅*")
break
case 'kisahnabi': {
if (!text) return reply(`Ketik nama Nabi\nContoh : ${prefix + command} Muhammad`) 
try{
let tod = await fetchJson(`https://api.zeeoneofc.my.id/api/islam/kisahnabi?nabi=${text}&apikey=${global.zeeofckey}`)
const name = tod.result.name
const ultah = tod.result.birth
const kematian = tod.result.death_age
const asal = tod.result.country_from
const cerita = tod.result.story
var kisah = `_*Kisah Nabi*_
Nama Nabi : ${name}
Hari Kelahiran : ${ultah}
Wafat Pada Umur : ${kematian}
Asal : ${asal}
Kisah Nabi *${name}* :
${cerita}`
reply(kisah) 
}catch (error) {
reply(`Ketik Nama Nabi Yang Valid`);
}
}
break
case 'asmaulhusna': {
try{
let tod = await fetchJson(`https://api.zeeoneofc.my.id/api/islam/asmaulhusna?apikey=${global.zeeofckey}`)
const ke = tod.result.index
const latin = tod.result.latin
const arab = tod.result.arabic
const indo = tod.result.translation_id
const english = tod.result.translation_en
var asmaul = `_*Random Asmaul Husna*_
Asmaul Husna Ke : ${ke}
Teks Arab : ${arab}
Teks Latin : ${latin}
Arti Dalam Bahasa Indonesia : ${indo}
Arti Dalam Bahasa Inggris : ${english}`
reply(asmaul) 
}catch (error) {
reply(`Maaf Terjadi Kesalahan`);
}
}
break
case 'listsurah': case 'listsurat': {
try{
let tod = await fetchJson(`https://api.zeeoneofc.my.id/api/islam/listsurah?apikey=${global.zeeofckey}`)
const list = tod.result
var surah = `_*List Surah*_
${list}`
reply(surah) 
}catch (error) {
reply(`Maaf Terjadi Kesalahan`);
}
}
break
case 'randomquran': {
try{
let tod = await fetchJson(`https://api.zeeoneofc.my.id/api/islam/randomquran?apikey=${global.zeeofckey}`)
const audio = tod.result.resources.ayah.audio.primary
const nama = tod.result.resources.nameOfSurah.long
const latin = tod.result.resources.nameOfSurah.transliteration.id
const nomer = tod.result.resources.numberOfSurah
const juz = tod.result.resources.ayah.meta.juz
const ayat = tod.result.resources.totalAyah
const ayatke = tod.result.resources.numberOfAyah
const teks = tod.result.resources.ayah.text.arab
const trans = tod.result.resources.ayah.text.transliteration.en
const artiid = tod.result.resources.ayah.translation.id
const artien = tod.result.resources.ayah.translation.en
const tafsir = tod.result.resources.ayah.tafsir.id.long
var quran = `_*Random Quran*_
Quran : ${nama}
Teks Latin : ${latin}
Surat Ke : ${nomer}
Juz : ${juz}
Total Ayat : ${ayat}
Ayat Ke : ${ayatke}
Isi Ayat : ${teks}
Latin : ${trans}
Arti Dalam Bahasa Indonesia : ${artiid}
Arti Dalam Bahasa Inggris : ${artien}
Tafsir Surah : ${tafsir}`
await reply(quran) 
await reply('Tunggu Sebentar Audio Sedang Dikirim') 
await agung.sendMessage(m.chat, {audio : {url : audio}, mimetype:'audio/mpeg'}, {quoted:m})}catch (error) {
reply(`Maaf Terjadi Kesalahan`);
}
}
break
case 'randomquran2': {
if (!text) return reply(`Masukkan Juznya\nContoh : ${prefix + command} 1`) 
try{
let tod = await fetchJson(`https://api.zeeoneofc.my.id/api/islam/randomquran2?juz=${text}&apikey=${global.zeeofckey}`)
const audio = tod.result.resources.ayah.audio.primary
const nama = tod.result.resources.nameOfSurah.long
const latin = tod.result.resources.nameOfSurah.transliteration.id
const nomer = tod.result.resources.numberOfSurah
const juz = tod.result.resources.ayah.meta.juz
const ayat = tod.result.resources.totalAyah
const ayatke = tod.result.resources.numberOfAyah
const teks = tod.result.resources.ayah.text.arab
const trans = tod.result.resources.ayah.text.transliteration.en
const artiid = tod.result.resources.ayah.translation.id
const artien = tod.result.resources.ayah.translation.en
const tafsir = tod.result.resources.ayah.tafsir.id.long
var quran = `_*Random Quran*_
Quran : ${nama}
Teks Latin : ${latin}
Surat Ke : ${nomer}
Juz : ${juz}
Total Ayat : ${ayat}
Ayat Ke : ${ayatke}
Isi Ayat : ${teks}
Latin : ${trans}
Arti Dalam Bahasa Indonesia : ${artiid}
Arti Dalam Bahasa Inggris : ${artien}
Tafsir Surah : ${tafsir}`
await reply(quran) 
await reply('Tunggu Sebentar Audio Sedang Dikirim') 
await agung.sendMessage(m.chat, {audio : {url : audio}, mimetype:'audio/mpeg'}, {quoted:m})}catch (error) {
reply(`Maaf Terjadi Kesalahan`);
}
}
break
case 'quranaudio': {
if (!text) return reply(`Masukkan Suratnya\nContoh : ${prefix + command} 1\n\nKetik .listsurah Untuk Melihat Daftar Surat`)  
try{
let tod = await fetchJson(`https://api.zahwazein.xyz/islami/quran/audio/${text}?apikey=${global.zenzkey}`)
const audio = tod.result
await reply('Tunggu Sebentar Audio Sedang Dikirim') 
await agung.sendMessage(m.chat, {audio : {url : audio}, mimetype:'audio/mpeg'}, {quoted:m})}catch (error) {
reply(`Maaf Terjadi Kesalahan`);
}
}
break
case 'infogempa': {
var caption = `Lokasi : ${data.result.lokasi}\n`
caption += `Waktu : ${data.result.waktu}\n`
caption += `Potensi : ${data.result.potensi}\n`
caption += `Magnitude : ${data.result.magnitude}\n`
caption += `Kedalaman : ${data.result.kedalaman}\n`
caption += `Koordinat : ${data.result.koordinat}`
agung.sendMessage(m.chat, { image: { url: data.result.map }, caption })
}
break
case 'lirik': {
if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`)
reply(mess.wait)
var { data } = await axios.get(`https://api.zerowebsite.eu.org/api/search/lirik?q=${encodeURIComponent(full_args)}&apikey=${global.zerokey}`)
agung.sendMessage(m.chat, { image: { url: data.data.thumb }, caption: data.data.lirik },{quoted:m})
}
break
case 'infocuaca': {
if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
reply(mess.wait)
var { data } = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${args[0]}?apikey=${global.lolhuman}`)
var titttttttttt = `Tempat : ${data.result.tempat}\n`
titttttttttt += `Cuaca : ${data.result.cuaca}\n`
titttttttttt += `Angin : ${data.result.angin}\n`
titttttttttt += `Description : ${data.result.description}\n`
titttttttttt += `Kelembapan : ${data.result.kelembapan}\n`
titttttttttt += `Suhu : ${data.result.suhu}\n`
titttttttttt += `Udara : ${data.result.udara}\n`
titttttttttt += `Permukaan laut : ${data.result.permukaan_laut}\n`
agung.sendMessage(m.chat, { location: { degreesLatitude: data.result.latitude, degreesLongitude: data.result.longitude } })
reply(titttttttttt)
}
break
case 'stalktiktok': {
await loading()
if (args.length == 0) return reply(`Example: ${prefix + command} bulansutena`)
axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${args[0]}?apikey=${global.lolhuman}`).then(({ data }) => {
var caption = `Username : ${data.result.username}\n`
caption += `Nickname : ${data.result.nickname}\n`
caption += `Followers : ${data.result.followers}\n`
caption += `Followings : ${data.result.followings}\n`
caption += `Likes : ${data.result.likes}\n`
caption += `Video : ${data.result.video}\n`
caption += `Bio : ${data.result.bio}\n`
agung.sendMessage(from, { image: { url: data.result.user_picture }, caption })
})
}
break
case 'ai': case 'openai':
try {
if (global.keyopenai === '') return reply("Api key limi exceeded");
if (!q) return reply(`Chat with AI.\n\nExample:\n${prefix + command} What is coding`)
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
apiKey: global.keyopenai,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
model: "text-davinci-003",
prompt: q,
temperature: 0.3,
max_tokens: 2000,
top_p: 1.0,
frequency_penalty: 0.0,
presence_penalty: 0.0,
});
reply(`${response.data.choices[0].text}`);
} catch (error) {
if (error.response) {
console.log(error.response.status);
console.log(error.response.data);
console.log(`${error.response.status}\n\n${error.response.data}`);
} else {
console.log(error);
reply("Sorry, there seems to be an error :"+ error.message);
}
}
break
case "img": case "aimage": case "image": case "images":
          try {
            if (global.keyopenai === '') return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: global.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            //console.log(response.data.data[0].url)
            agung.sendImage(from, response.data.data[0].url, text, m);
            } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
          break

//━━━━━━━━━━━━━━[ BATAS MENU ]━━━━━━━━━━━━━━━━━//

default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
agung.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
}
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(`Lu Siapa Ngentot?Ini Cuman Khusus agung Sayang ku♥️`)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
