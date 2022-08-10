const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg-static");
const ffmMT = require("ffmetadata");
const path = require("path");
const cp = require("child_process")
const getInfo = require("./getInfo")
const parserTitles = require("./parserTitles");
const { fileExist } = require("./existFile");

ffmMT.setFfmpegPath(ffmpeg);

/**
 * Executed when the process ends
 * @callback onClose
 * @param {number} id identifier of the process
 * @returns {void}
 */


/**
 * Executed everytime the process is executed
 * @callback onData
 * @param {total} percentage percentage of the process
 * @param {size} size
 * @param {number} id identifier of the process
 * @returns {void}
 */


/**
 * @typedef {object} total
 * @property {number} percentage
 * @property {number} audioTotal
 * @property {number} videoTotal
 */

/**
 * @typedef {object} size 
 * @property {number} downloaded Total size downloaded of the video in bytes
 * @property {number} totalSize Total size of the video in bytes
 */ 

/**
 * @typedef {object} options
 * @property {string} url
 * @property {number} itag
 * @property {string} directoryDownload
 * @property {string} title
 */

/**
 * 
 * @param {options} options
 * @param {onData} onData Event executed everytime the process is executed, by default prints the percentage of the process
 * @param {onClose} onClose Event executed when the process ends
 * @returns {string}
 * @memberof module:yt-converter
 */

const convertVideo = async (options, onData, onClose) => {
    try {
        const { url, itag, directoryDownload } = options
        const info = await getInfo(url)
        const id = Date.now();
        const tracker = {
            audio: {
                total: null,
                downloaded: null
            },
            video: {
                total: null,
                downloaded: null
            }
        }
        const format = info.formats.find((fm) => fm.itag === itag)
        const title = parserTitles(options?.title) || parserTitles(info.title)
        const audio = ytdl(url, {
            filter: "audioonly",
            quality: "lowestaudio",
        }).on("progress", (_, downloaded, total) => {
            tracker.audio = { downloaded, total }
        })
        const video = ytdl(url, {
            filter: "videoonly",
            quality: format.itag
        }).on("progress", (_, downloaded, total) => {
            tracker.video = { downloaded, total }
        })
    
        const pathname = path.resolve(process.cwd(), directoryDownload, `${title}.mp4`)
        if (!fileExist(pathname)) {
            const ffmpegProcess = cp.spawn(ffmpeg, [
                "-loglevel", "8", "-hide_banner",
                "-progress", "pipe:3",
                "-i", "pipe:4",
                "-i", "pipe:5",
                "-map", "0:a",
                "-map", "1:v",
                "-c:v", "copy",
                `${pathname}`,
            ], {
                windowsHide: true,
                stdio: [
                    /* Standard: stdin, stdout, stderr */
                    "inherit", "inherit", "inherit",
                    /* Custom: pipe:3, pipe:4, pipe:5 */
                    "pipe", "pipe", "pipe"
                ],
            });
    
            ffmpegProcess.stdio[3].on("data", () => {
                const videoTotal = (tracker.video.downloaded / tracker.video.total) * 100
                const audioTotal = (tracker.audio.downloaded / tracker.audio.total) * 100
                const total = ((videoTotal + audioTotal) / 2)
                const videoSize = tracker.video.total + tracker.audio.total;
                const downloadedSize = tracker.video.downloaded + tracker.audio.downloaded;
                // eslint-disable-next-line object-curly-newline
                if (onData) onData({ percentage: total, videoTotal, audioTotal }, { downloaded: downloadedSize, totalSize: videoSize }, id)
            })
        
            ffmpegProcess.on("close", () => {
                if (onClose) onClose(id)
            })
        
            audio.pipe(ffmpegProcess.stdio[4])
            video.pipe(ffmpegProcess.stdio[5])
        } else if (onClose) onClose(id)
    
        return title
    } catch (err) {
        console.error(err)
    }
}

module.exports = convertVideo;