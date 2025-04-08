const ffmMT = require('ffmetadata');
const { createWriteStream } = require('fs');
const { Audio, createStreamAudio, createStreamVideo } = require('../dist/index');

const link = 'https://www.youtube.com/watch?v=huOcOPqs-DU';

async function test(url) {
  const stream = await createStreamVideo({ url });
  stream.pipe(createWriteStream('test.mkv'));
  stream.on("data",chunk=>{
    console.log(chunk)
  })
}

test(link);
