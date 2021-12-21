/* eslint-disable no-unused-vars */
const getInfo = require("./utils/getInfo");
const convertAudio = require("./utils/convertAudio");
const converteVideo = require("./utils/convertVideo");

// getInfo("https://www.youtube.com/watch?v=dQw4w9WgXcQ").then((info) => console.log(info))
// convertAudio("https://www.youtube.com/watch?v=dQw4w9WgXcQ", 140, "./", () => console.log("Done!"))
converteVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ", 136, "./", () => console.log("Done!"))