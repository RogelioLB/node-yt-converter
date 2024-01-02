import fs from 'fs';

const fileExist = (pathname:string) => fs.existsSync(pathname);

export default fileExist;
