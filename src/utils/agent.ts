import ytdl, { Agent } from '@distube/ytdl-core';
import dotenv from 'dotenv';

dotenv.config();

const useAgent = !!process.env.PROXY_URL;
let agent : Agent | undefined;
if (process.env.PROXY_URL) {
  agent = ytdl.createProxyAgent({ uri: process.env.PROXY_URL });
}
export { agent, useAgent };
