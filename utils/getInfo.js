const ytdl = require("ytdl-core")

/**
 * @typedef {Object} Thumbnail
 * @property {string} url
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} Format
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
 * @typedef {object} VideoInfo
 * @property {string} title
 * @property {string} author
 * @property {number} lengthSeconds
 * @property {number} viewCount
 * @property {Array<Format>} formats
 * @property {Array<Format>} formatsAudio
 * @property {Array<Format>} formatsVideo
 * @property {Array<Thumbnail>} thumbnails
 */

/**
 * @param {string} url
 * @return {Promise<VideoInfo>}
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