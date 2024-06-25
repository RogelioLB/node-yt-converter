import ffmMT from 'ffmetadata';

import { Video, Audio } from '../src/index';

const link = 'https://www.youtube.com/watch?v=s_nc1IVoMxc';

async function test(url:string) {
  const data = await Video({
    url,
    onDownloading: (d) => console.log(`Downloaded ${d.percentage}%`),
    directory: './',
  });
  ffmMT.read(data.pathfile, (err, res) => {
    if (err) console.error('Error reading metadata', err);
    else console.log(res);
  });

  console.log(data.message);
}

test(link);
