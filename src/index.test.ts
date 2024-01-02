/* eslint-disable no-unused-vars */
import { Video, Audio } from '../dist/src/index';

const link = 'https://www.youtube.com/watch?v=QI5idh3Uwh4&list=RDQI5idh3Uwh4&start_radio=1';

async function test(url:string) {
  const data = await Audio({
    url,
    onDownloading: (d) => console.log(d),
  });

  console.log(data.message);
}

test(link);
