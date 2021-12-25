const ytdl = require("ytdl-core")

/**
 * @typedef {object} thumbnail
 * @property {string} url
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {object} format
 * @property {number} audioBitrate
 * @property {number} audioQuality
 * @property {number} approxDurationMs
 * @property {string} container
 * @property {boolean} hasAudio
 * @property {boolean} hasVideo
 * @property {number} itag
 * @property {string} quality
 * @property {string} qualityLabel
 */

/**
 * @typedef {object} videoInfo
 * @property {string} title
 * @property {string} author
 * @property {number} lengthSeconds
 * @property {number} viewCount
 * @property {Array<format>} formats
 * @property {Array<format>} formatsAudio
 * @property {Array<format>} formatsVideo
 * @property {Array<thumbnail>} thumbnails
 */

/**
 * @param {string} url
 * @return {Promise<videoInfo>}
 * @memberof module:yt-converter
 */
const getInfo = (url) => new Promise((resolve, reject) => {
    try {
        ytdl.getInfo(url).then((info) => {
            const {
                title, author, lengthSeconds, viewCount, likes, dislikes, averageRating, thumbnails
            } = info.videoDetails


            const formats = info.formats.map((format) => {
                const {
                    audioBitrate, audioQuality, approxDurationMs, container, hasAudio, hasVideo, itag, quality, qualityLabel
                } = format
                return {
                    audioBitrate, audioQuality, approxDurationMs, container, hasAudio, hasVideo, itag, quality, qualityLabel
                }
            })

            const formatsAudio = formats.filter((format) => format.hasAudio && !format.hasVideo)
            const formatsVideo = formats.filter((format) => format.hasVideo && !format.hasAudio)

            const infoObj = {
                title,
                author,
                lengthSeconds,
                viewCount,
                likes,
                dislikes,
                averageRating,
                thumbnails,
                formats,
                formatsAudio,
                formatsVideo
            }
            resolve(infoObj)
        })
    } catch (e) {
        reject(e)
    }
})

module.exports = getInfo