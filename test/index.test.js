const ffmMT = require('ffmetadata');
const { Audio } = require('../dist/index');

const link = 'https://www.youtube.com/watch?v=s_nc1IVoMxc';

async function test(url) {
  const data = await Audio({
    url,
    onDownloading: (d) => console.log(`Downloaded ${d.percentage}%`),
    directory: './',
  });
  console.log(data.pathfile);
  ffmMT.read(data.pathfile, (err, res) => {
    if (err) console.error('Error reading metadata', err);
    else console.log(res);
  });

  console.log(data.message);
}

test(link);
