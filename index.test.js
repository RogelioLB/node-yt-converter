/* eslint-disable no-unused-vars */
const getInfo = require("./utils/getInfo");
const convertAudio = require("./utils/convertAudio");
const convertVideo = require("./utils/convertVideo");

// getInfo("https://www.youtube.com/watch?v=JzbGrvkqV5w").then((info) => console.log(info))
// convertAudio("https://www.youtube.com/watch?v=dQw4w9WgXcQ", 140, "./", () => console.log("Done!"))

convertVideo({
    url: "https://www.youtube.com/watch?v=JzbGrvkqV5w",
    itag: 137,
    directoryDownload: "./"
}, (percentage) => {
    console.log(`Downloading: ${percentage}%`)
})