/* eslint-disable no-unused-vars */
const yt = require("yt-converter")


yt.convertAudio({
    url: "https://www.youtube.com/watch?v=JzbGrvkqV5w",
    itag: 140,
    directoryDownload: "../public"
})

