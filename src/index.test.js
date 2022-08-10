/* eslint-disable no-unused-vars */
const yt = require("./index")

const link = "https://www.youtube.com/watch?v=fIkw_Rc7ZJA"

const getTitle = yt.getInfo(link).then((info) => info.title);
const getIngfo = yt.getInfo(link).then((info) => ({
    title: info.title, author: info.author.name, likes: info.likes
}));
const getThumb = yt.getInfo(link).then((info) => info.thumbnails[4].url)

async function tes(link) {
    const title = await getTitle
    const ingfo = await getIngfo
    const thumb = await getThumb
    const thumbnails = thumb.split("?")
    // console.log(thumbnails[0])
    console.log(title)
    yt.convertAudio({
        url: link,
        directoryDownload: "./",
        itag: 140,
        title
    }, (percentage, size) => {
        console.log(Math.floor(percentage), size.totalSize)
    }, () => {
        console.log(ingfo)
    })
}

tes(link)