const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg-static");
const ffmMT = require("ffmetadata");
const path = require("path");
const cp = require("child_process")
const getInfo = require("./getInfo")
const parserTitles = require("./parserTitles")

ffmMT.setFfmpegPath(ffmpeg);

/**
 * Executed when the process ends
 * @callback onClose
 * @returns {void}
 */


/**
 * Executed everytime the process is executed
 * @callback onData
 * @param {string} percentage percentage of the process
 * @returns {void}
 */

/**
 * @typedef {object} options
 * @property {string} url
 * @property {number} itag
 * @property {string} directoryDownload
 */

/**
 * @param {options} options
 * @param {onData} onData Event executed everytime the process is executed by default prints the percentage of the process
 * @param {onClose} onClose Event executed when the process ends
 * @memberof module:yt-converter
*/
const convertAudio = async (options, onData, onClose) => {
    try {
        const { url, itag, directoryDownload } = options
        const info = await getInfo(url)
        const tracker = {
            total: null,
            downloaded: null
        }
        const format = info.formats.find((fm) => fm.itag === itag)
        const title = parserTitles(info.title)
        const stream = ytdl(url, {
            filter: "audioonly",
            quality: format.itag
        }).on("progress", (_, downloaded, total) => {
            tracker.total = total
            tracker.downloaded = downloaded
        })
        console.log(__dirname)
        const pathname = path.resolve(process.cwd(), directoryDownload, `${title}.mp3`)
        console.log(pathname)
    
        const ffmpegProcess = cp.spawn(ffmpeg, [
            "-loglevel", "8", "-hide_banner",
            "-progress", "pipe:3",
            "-i", "pipe:4",
            "-b:a", `${format.audioBitrate}`,
            `${pathname}`,
        ], {
            windowsHide: true,
            stdio: [
                /* Standard: stdin, stdout, stderr */
                "inherit", "inherit", "inherit",
                /* Custom: pipe:3, pipe:4 */
                "pipe", "pipe",
            ],
        });

        ffmpegProcess.stdio[3].on("data", () => {
            const percentage = Math.round((tracker.downloaded / tracker.total) * 100).toString()
            console.log(`Downloading: ${percentage}% for ${title}`)
            if (onData) onData(percentage)
        })
    
        ffmpegProcess.on("close", () => {
            const metadata = {
                artist: info.author.name,
                title,
                album: info.author.name
            }
            ffmMT.write(pathname, metadata, (err) => {
                if (err) throw err;
                if (onClose) onClose()
            });
        })
    
        stream.pipe(ffmpegProcess.stdio[4])
    } catch (err) {
        console.error(err)
    }
}

module.exports = convertAudio;