import ytdl from 'ytdl-core';
import { ConvertOptions } from '../../types';

function Video(options : ConvertOptions) {
  const {
    directory, itag, url, title,
  } = options;

  const tracker = {
    audio: {
      total: null,
      downloaded: null,
    },
    video: {
      total: null,
      downloaded: null,
    },
  };

  return new Promise(async (resolve, reject) => {
    try {
      const video_info = await ytdl.getInfo(url);
    } catch (err) {
      reject(err.message);
    }
  });
}
export default Video;
