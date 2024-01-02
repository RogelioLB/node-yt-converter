import cp from 'child_process';
import { videoInfo } from 'ytdl-core';

export interface ConvertOptions{
    title?:string,
    itag?:number,
    url:string,
    directory?:string,
    onDownloading?:(data:{percentage:number, size:number})=>void
}

export interface MessageResult{
    message:string,
    error:boolean,
    videoInfo:videoInfo
}

export interface FFmpegProcess extends cp.ChildProcess{
    stdio:any
}
