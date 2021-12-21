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
 * @name onClose
 * @function
 */

/**
 * @param {string} url 
 * @param {number} itag 
 * @param {string} directoryDownload 
 * @param {onClose} onClose 
 */
const convertAudio = async (url, itag, directoryDownload, onClose) => {
    try {
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
    
        const pathname = path.resolve(process.cwd(), directoryDownload, `${title}.mp3`)
    
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
            const percentage = Math.round((tracker.downloaded / tracker.total) * 100)
            console.log(`Downloading: ${percentage}% for ${title}`)
        })
    
        ffmpegProcess.on("close", () => {
            const options = {
                artist: info.author.name,
                title,
                album: info.author.name
            }
            ffmMT.write(pathname, options, (err) => {
                if (err) throw err;
                onClose()
            });
        })
    
        stream.pipe(ffmpegProcess.stdio[4])
    } catch (err) {
        console.error(err)
    }
}

module.exports = convertAudio;