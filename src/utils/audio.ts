import ytdl, { videoFormat } from '@distube/ytdl-core';
import path from 'path';
import ffmpeg from 'ffmpeg-static';
import cp from 'child_process';
import ffmMT from 'ffmetadata';
import parser from './parserTitles';
import { ConvertOptions, FFmpegProcess, MessageResult } from '../types';
import fileExist from './fileExist';

async function Audio(options : ConvertOptions) {
  const {
    directory = './', itag, url, title, onDownloading, ffmpegPath,
  } = options;

  const tracker = {
    total: null,
    downloaded: null,
  };

  // Info Youtube
  const videoInfo = await ytdl.getInfo(url);
  let format : videoFormat;
  if (itag) { format = videoInfo.formats.find((fm) => fm.itag === itag); }
  const fileTitle = title || parser(videoInfo.videoDetails.title);

  // Stream audio and video
  const stream = ytdl(url, {
    filter: 'audioonly',
    quality: format?.itag || 'highestaudio',
  }).on('progress', (_, downloaded, total) => {
    tracker.total = total;
    tracker.downloaded = downloaded;
  });

  const pathname = path.resolve(process.cwd(), directory, `${fileTitle}.mp3`);

  const promise = new Promise<MessageResult>((resolve, reject) => {
    if (fileExist(pathname)) {
      resolve({
        message: `File already downloaded in ${pathname}`, error: false, videoInfo, pathfile: pathname,
      });
    } else {
      const ffmpegProcess : FFmpegProcess = cp.spawn(ffmpegPath || ffmpeg, [
        '-loglevel', '8', '-hide_banner',
        '-progress', 'pipe:3',
        '-i', 'pipe:4',
        `${pathname}`,
      ], {
        windowsHide: true,
        stdio: [
          'inherit', 'inherit', 'inherit',
          'pipe', 'pipe', 'pipe',
        ],
      });
      if (ffmpegProcess === undefined) {
        reject(new Error('Cannot initialize ffmpeg'));
      }
      ffmpegProcess.stdio[3].on('data', () => {
        const percentage = ((tracker.downloaded / tracker.total) * 100);
        const size = tracker.total;
        if (onDownloading) onDownloading({ percentage, size });
      });

      ffmpegProcess.on('close', () => {
        const metadata = {
          artist: videoInfo.videoDetails.author.name,
          title: fileTitle,
          album: videoInfo.videoDetails.author.name,
        };
        ffmMT.write(pathname, metadata, (err) => {
          if (err) throw err;
          resolve({
            message: `File in ${pathname}`, error: false, videoInfo, pathfile: pathname,
          });
        });
      });

      stream.pipe(ffmpegProcess.stdio[4]);
    }
  });
  return promise;
}
export default Audio;
