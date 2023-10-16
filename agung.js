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
case 'menu': {
let menu = `
*┌ Bot Name* : *ZXBOT*
*│ Version* : *1*
*│ Language* : *NodeJs*
*└ Baileys* : *@adiwashing/baileys*

*L I S T - M E N U*
*┌ ◦ .bayar*
*│ ◦ .ownermenu*
*│
*—  D O W N L O A D M E N U ッ*  
*│ ◦ .play*
*│ ◦ .ytmp3 [link]*
*│ ◦ .ytmp4 [link]*
*│ ◦ .spotify*
*│ ◦ .spotifydl [link]*
*│ ◦ .tiktoksearch [query*
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
*—  I S L A M I C  M E N U ッ*
*│ ◦ .jadwalsholat*
*│ ◦ .tafsirsurah*
*│ ◦ .alquranaudio*
*│ ◦ .alquran*
*│ ◦ .kisahnabi*
*│ ◦ .listsurah*`
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
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *query*\n\n_Contoh_\n\n${prefix+command} jj epep`)
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
if (!text) return reply(`Gunakan dengan cara ${prefix+command} text\n\nContoh : ${prefix+command} Halo semuanya`)
await agung.sendPresenceUpdate('recording', m.chat);
var suara = await fetchJson(`https://xzn.wtf/api/tts-anime?text=${text}&lang=mix&voice=paimon&speed=0.65&symbol=y&apikey=arel25`)
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
case 'jadwalsholat': {
            case 'jadwalshalat':
            case 'jadwalsolat':
            case 'jadwalsalat': {
                if (!text) return (`Contoh : ${prefix + command} Bandung`)
                let res = await agung.jadwalsholat(text)  
                let capt = `Jadwal Sholat Kota : ${text}\n\n`
                let i = res
                    capt += `• Tanggal : ${i.tanggal}\n`
                    capt += `• Imsak : ${i.imsyak}\n`
                    capt += `• Subuh : ${i.subuh}\n`
                    capt += `• Dzuhur : ${i.dzuhur}\n`
                    capt += `• Ashar : ${i.ashar}\n`
                    capt += `• Maghrib : ${i.maghrib}\n`
                    capt += `• Isya : ${i.isya}\n\n──────────────────────\n`
                reply(capt)
            }
            break
	case 'tafsirsurah': {
                if (!args[0]) return `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`
                if (!args[1]) return `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`
                let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
                let txt = `「 *Tafsir Surah*  」

*Pendek* : ${res.result.data.tafsir.id.short}

*Panjang* : ${res.result.data.tafsir.id.long}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
                reply(txt)
            }
            break
case 'asmaulhusna': {
            reply(mess.wait)
			axios.get(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${global.lolhuman}`)
				.then(({ data }) => {
					var text = `No : ${data.result.index}\n`
					text += `Latin: ${data.result.latin}\n`
					text += `Arab : ${data.result.ar}\n`
					text += `Indonesia : ${data.result.id}\n`
					text += `English : ${data.result.en}`
					reply(text)
				})
}
				.catch(console.error)
			break
			case 'alquranaudio': {
                if (args.length == 0) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10`)
                reply(mess.wait)
                agung.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/quran/audio/${args[0]}?apikey=${global.lolhuman}`}, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
            }
            break
            case 'alquran': {
			if (args.length < 1) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10 or ${prefix + command} 18/1-10`)
			reply(mess.wait)
			axios.get(`https://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${global.lolhuman}`)
				.then(({ data }) => {
					var ayat = data.result.ayat
					var text = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`
					for (var x of ayat) {
						text += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`
					}
					text = text.replace(/<u>/g, '_').replace(/<\/u>/g, '_')
					text = text.replace(/<strong>/g, '*').replace(/<\/strong>/g, '*')
					reply(text)
				})
	    }
				.catch(console.error)
            break
case 'kisahnabi': {
			if (args.length == 0) return reply(`Example: ${prefix + command} Muhammad`)
			reply(mess.wait)
			axios.get(`https://api.lolhuman.xyz/api/kisahnabi/${full_args}?apikey=${global.lolhuman}`)
				.then(({ data }) => {
					var text = `Name : ${data.result.name}\n`
					text += `Lahir : ${data.result.thn_kelahiran}\n`
					text += `Umur : ${data.result.age}\n`
					text += `Tempat : ${data.result.place}\n`
					text += `Story : \n${data.result.story}`
					reply(text)
				})
}
				.catch(console.error)
			break
            case 'listsurah': {
            reply(mess.wait)
			axios.get(`https://api.lolhuman.xyz/api/quran?apikey=${global.lolhuman}`)
				.then(({ data }) => {
					var text = 'List Surah:\n'
					for (var x in data.result) {
						text += `${x}. ${data.result[x]}\n`
					}
					reply(text)
				})
}
				.catch(console.error)
			break
	case"sticker":case"s":if(!quoted)return reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix + command}
Durasi Video 1-9 Detik`);if(/image/.test(mime))await fs.unlinkSync(await agung.sendImageAsSticker(m.chat,await quoted.download(),m,{packname:global.packname,author:global.footer}));else if(/video/.test(mime)){if((quoted.msg||quoted).seconds>11)return reply("Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik");await fs.unlinkSync(await agung.sendVideoAsSticker(m.chat,await quoted.download(),m,{packname:global.packname,author:global.footer}))}else reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix + command}
Durasi Video 1-9 Detik`)
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
