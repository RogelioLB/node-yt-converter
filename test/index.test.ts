import fs from "fs";
import { createStreamAudio, createStreamVideo, getInfo } from "../src/index";

const link = "https://www.youtube.com/watch?v=fG07I9UlnoI";

async function test(url: string) {
  const stream = await createStreamVideo({
    url,
    itag: 136,
  });
  stream.pipe(fs.createWriteStream("video.mkv"));
}

test(link);
