const parserTitles = (title) => {
    const regex = /[\\,:,?,|,¿,*,<,>,",/]/g
    return title.replace(regex, "")
}

module.exports = parserTitles
