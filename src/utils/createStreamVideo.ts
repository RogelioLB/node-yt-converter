import { spawn } from "child_process";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "ffmpeg-static";
import { ConvertOptions, FFmpegProcess } from "../types";
import { useAgent, agent } from "./agent";

interface Options
  extends Omit<ConvertOptions, "onDownloading" | "directory" | "title"> {}

export default async function createStreamVideo(options: Options) {
  const { url, itag } = options;

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

  const audio = ytdl(url, {
    quality: "highestaudio",
  })
    .on("progress", (_, downloaded, total) => {
      tracker.audio = { downloaded, total };
    })
    .on("error", (e) => console.log(e));
  const video = ytdl(url, {
    quality: itag,
  })
    .on("progress", (_, downloaded, total) => {
      tracker.video = { downloaded, total };
    })
    .on("error", (e) => console.log(e));

  const ffmpegProcess = spawn(
    ffmpeg,
    [
      "-hide_banner",
      "-progress",
      "pipe:5",
      "-i",
      "pipe:3", // Input audio
      "-i",
      "pipe:4", // Input video
      "-map",
      "0:a",
      "-map",
      "1:v",
      "-c:v",
      "copy", // Códec de video
      "-f",
      "matroska", // Formato de salida
      "pipe:1", // Salida por pipe
    ],
    {
      windowsHide: true,
      stdio: ["pipe", "pipe", "ignore", "pipe", "pipe", "pipe"],
    }
  ) as unknown as FFmpegProcess;

  audio.pipe(ffmpegProcess.stdio[3]);
  video.pipe(ffmpegProcess.stdio[4]);

  ffmpegProcess.stdio[5].on("data", (chunk) => {
    const videoTotal = (tracker.video.downloaded / tracker.video.total) * 100;
    const audioTotal = (tracker.audio.downloaded / tracker.audio.total) * 100;
    const total = (videoTotal + audioTotal) / 2;
    const videoSize = tracker.video.total + tracker.audio.total;
    const videoSizeMB = videoSize / 1024 / 1024;
    const downloadedMB =
      (tracker.video.downloaded + tracker.audio.downloaded) / 1024 / 1024;

    console.log(
      `Progress: ${total.toFixed(2)}% - ${downloadedMB.toFixed(
        2
      )}MB/${videoSizeMB.toFixed(2)}MB`
    );
  });

  return ffmpegProcess.stdout; // Regresa el stream de salida
}
