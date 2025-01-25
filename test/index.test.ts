import fs from 'fs';
import { Video, Audio, createStreamAudio } from '../src/index';

const link = 'https://www.youtube.com/watch?v=huOcOPqs-DU';

async function test(url:string) {
  const stream = await createStreamAudio({ url });
  stream.pipe(fs.createWriteStream('test.mp3'));
}

test(link);
