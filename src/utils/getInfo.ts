import ytdl, {
  Author, thumbnail, videoFormat,
} from '@distube/ytdl-core';
import { agent, useAgent } from './agent';

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

interface Info{
  title: string;
  author: Author;
  lengthSeconds: string;
  viewCount: string;
  likes: number;
  averageRating: number;
  thumbnails: Array<thumbnail>;
  formats: Array<videoFormat>;
  formatsAudio: Array<videoFormat>;
  formatsVideo: Array<videoFormat>;
}

const getInfo = (url) => new Promise<Info>((resolve, reject) => {
  try {
    ytdl.getInfo(url, { agent: useAgent ? agent : undefined }).then((info) => {
      const {
        title, author, lengthSeconds, viewCount, likes, averageRating, thumbnails,
      } = info.videoDetails;

      const { formats } = info;

      const formatsAudio = formats.filter((format) => format.hasAudio && !format.hasVideo);
      const formatsVideo = formats.filter((format) => format.hasVideo && !format.hasAudio);

      const infoObj = {
        title,
        author,
        lengthSeconds,
        viewCount,
        likes,
        averageRating,
        thumbnails,
        formats,
        formatsAudio,
        formatsVideo,
      };
      resolve(infoObj);
    }).catch((err) => reject(err));
  } catch (e) {
    reject(e);
  }
});

export default getInfo;
