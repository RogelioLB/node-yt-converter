import cp from 'child_process';
import stream from 'stream'
import { videoInfo } from '@distube/ytdl-core';

export interface ConvertOptions{
    title?:string,
    itag?:number,
    url:string,
    directory?:string,
    ffmpegPath?:string,
    onDownloading?:(data:{percentage:number, size:number})=>void
}

export interface MessageResult{
    message:string,
    error:boolean,
    videoInfo:videoInfo,
    pathfile:string
}

export interface FFmpegProcess extends Omit<cp.ChildProcess,'stdio'>{
    stdio:any
}
