import ytdl, { videoFormat } from '@distube/ytdl-core';
import path from 'path';
import ffmpeg from 'ffmpeg-static';
import cp from 'child_process';
import parser from './parserTitles';
import { ConvertOptions, FFmpegProcess, MessageResult } from '../types';
import fileExist from './fileExist';

async function Video(options : ConvertOptions) {
  const {
    directory = './', itag, url, title, onDownloading, ffmpegPath,
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

  // Info Youtube
  const videoInfo = await ytdl.getInfo(url);
  let format : videoFormat;
  if (itag) { format = videoInfo.formats.find((fm) => fm.itag === itag); }
  const fileTitle = title || parser(videoInfo.videoDetails.title);
  // Stream audio and video
  const audio = ytdl(url, {
    filter: 'audioonly',
    quality: 'lowestaudio',
  }).on('progress', (_, downloaded, total) => {
    tracker.audio = { downloaded, total };
  });
  const video = ytdl(url, {
    quality: format?.itag || 'highestvideo',
    dlChunkSize: 1024 * 1024 * 1024,
  }).on('progress', (_, downloaded, total) => {
    tracker.video = { downloaded, total };
  });

  const pathname = path.resolve(process.cwd(), directory, `${fileTitle}.mp4`);

  const promise = new Promise<MessageResult>((resolve, reject) => {
    if (fileExist(pathname)) {
      resolve({
        message: `File already downloaded in ${pathname}`, error: false, videoInfo, pathfile: pathname,
      });
    } else {
      const ffmpegProcess = cp.spawn(ffmpegPath || ffmpeg, [
        '-loglevel', '8', '-hide_banner',
        '-progress', 'pipe:3',
        '-i', 'pipe:4',
        '-i', 'pipe:5',
        '-map', '0:a',
        '-map', '1:v',
        '-c:v', 'copy',
        `${pathname}`,
      ], {
        windowsHide: true,
        stdio: [
          'inherit', 'inherit', 'inherit',
          'pipe', 'pipe', 'pipe',
        ],
      }) as unknown as FFmpegProcess;

      if (ffmpegProcess === undefined) {
        reject(new Error('Cannot initialize ffmpeg'));
      }

      ffmpegProcess.stdio[3].on('data', () => {
        const videoTotal = (tracker.video.downloaded / tracker.video.total) * 100;
        const audioTotal = (tracker.audio.downloaded / tracker.audio.total) * 100;
        const total = ((videoTotal + audioTotal) / 2);
        const videoSize = tracker.video.total + tracker.audio.total;
        // eslint-disable-next-line object-curly-newline
        if (onDownloading)onDownloading({ percentage: total, size: videoSize });
      });

      ffmpegProcess.on('close', () => {
        resolve({
          message: `File in ${pathname}`, error: false, videoInfo, pathfile: pathname,
        });
      });

      audio.pipe(ffmpegProcess.stdio[4]);
      video.pipe(ffmpegProcess.stdio[5]);
    }
  });
  return promise;
}
export default Video;
