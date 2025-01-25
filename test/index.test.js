const ffmMT = require('ffmetadata');
const { createWriteStream } = require('fs');
const { Audio, createStreamAudio } = require('../dist/index');

const link = 'https://www.youtube.com/watch?v=huOcOPqs-DU';

async function test(url) {
  const stream = await createStreamAudio({ url });
  stream.pipe(createWriteStream('test.mp3'));
}

test(link);
