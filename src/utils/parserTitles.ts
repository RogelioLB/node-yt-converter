const parserTitles = (title:string) => {
  const regex = /[\\,:,?,|,¿,*,<,>,",/]/g;
  return title.replace(regex, '');
};

export default parserTitles;
