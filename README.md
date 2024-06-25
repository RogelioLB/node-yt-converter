# Node YoutubeDL - Easy to use downloader for YouTube videos

> [!IMPORTANT]
> Version 2.0 Released. New way to use it.

## Installation 
```bash
npm install yt-converter
```

## Usage

There's two ways to use this library, convert audio or video. For this the package exports two functions named Audio, and Video, each one is for convert audio and video respectively.

### Converting Youtube Video to MP3 file

```ts
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
```

### Converting Youtube Video to MP4 file

```ts
import { Video, Audio } from '../dist/src/index';

const link = 'https://www.youtube.com/watch?v=QI5idh3Uwh4&list=RDQI5idh3Uwh4&start_radio=1';

async function test(url:string) {
  const data = await Video({
    url,
    onDownloading: (d) => console.log(d),
  });

  console.log(data.message);
}

test(link);
```
### Function params

Both fuctions need an options object.

* *url*: Expect to be a string representing the url link of the youtube video. 
* *directory (optional)*: Path relative where you want the file converted.
* *itag*: This represents a number of a specific format. [For more information](https://en.wikipedia.org/wiki/YouTube#Quality_and_formats)
* *onDownloading (optional)* : Function will be executed while the file is downloading.
* *ffmpegPath (optional)*: Specify the path to the ffmpeg binary. By default uses the path provided by the package. But if you want use on a VM or Hosting maybe you should use a custom path.

Once the functions Video and Audio are executed, returns a promise wich resolve a data object.

* *message*
* *error*
* *videoInfo*