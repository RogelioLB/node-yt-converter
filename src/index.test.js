/* eslint-disable no-unused-vars */
const yt = require("./index")

yt.convertAudio({
    url: "https://www.youtube.com/watch?v=JzbGrvkqV5w",
    directoryDownload: __dirname,
    itag: 140,
    title: "Audio"
}, (percentage, size, id) => {
    console.log(percentage, size, id)
}, () => {
    console.log("already downloaded")
});
