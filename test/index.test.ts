import fs from "fs";
import {
  createStreamAudio,
  createStreamVideo,
  getInfo,
  Video,
} from "../src/index";

const link = "https://www.youtube.com/watch?v=fG07I9UlnoI";

async function test(url: string) {
  const stream = await Video({
    url,
    itag: 136,
    onDownloading: (data) => {
      console.log(data);
    },
  });
}

test(link);
