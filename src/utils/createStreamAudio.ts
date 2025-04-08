import ytdl, { videoFormat } from '@distube/ytdl-core';
import { spawn } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import { ConvertOptions } from '../types';
import { agent, useAgent } from './agent';

interface Options extends Omit<ConvertOptions, 'onDownloading' | 'directory' | 'title'>{}

export default async function createStreamAudio(options:Options) {
  const { url, itag } = options;

  const info = await ytdl.getInfo(url);

  const stream = ytdl(url, {
    filter: 'audioonly',
    quality: itag,
    agent: useAgent ? agent : undefined,
  });

  const ffmpegProcess = spawn(ffmpeg, [
    '-i', 'pipe:0',
    '-f', 'mp3',
    '-ar', '48000',
    '-ac', '2',
    '-b:a', '192k',
    // Add metadata
    '-metadata', `title=${info.videoDetails.title}`,
    '-metadata', `artist=${info.videoDetails.author.name}`,
    '-metadata', `album=${info.videoDetails.author.name}`,
    'pipe:1',
  ], {
    stdio: ['pipe', 'pipe', 'ignore'],
  });

  stream.pipe(ffmpegProcess.stdin);

  return ffmpegProcess.stdout;
}
