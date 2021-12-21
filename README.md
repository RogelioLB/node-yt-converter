# Node YoutubeDL - Easy to use downloader for YouTube videos

## Installation 
```bash
npm install yt-converter
```

## Usage
### Get Info from a video
```js
const yt = require("yt-converter");
yt.getInfo("https://www.youtube.com/watch?v=dQw4w9WgXcQ").then(info => {
    console.log(info);
});
```

Info represents the video information:
- **title**
- **author**
- **thumbnails**
- **formats**
  - Contains the available formats for the video in an array
  - The object has the property itag which can be used to convert the video
- **formatsAudio**
- **formatsVideo**

### Download a video format mp4
```js
const yt = require("yt-converter");
yt.convertVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ", itag,path, onClose)
```

### Download a video format mp3
```js
const yt = require("yt-converter");
yt.convertAudio("https://www.youtube.com/watch?v=dQw4w9WgXcQ", itag,path, onClose)
```
- **itag**: [itag]("https://en.wikipedia.org/wiki/YouTube#Quality_and_formats") represent an number of video format 
- **path**: path to save the file
- **onClose**: callback function when the conversion is finished