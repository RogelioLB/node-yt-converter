import express from 'express';
import { createStreamVideo } from '../src';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/download', async (req, res) => {
  const stream = await createStreamVideo({ url: 'https://www.youtube.com/watch?v=vJMMf-z25I0&list=RDjnOw8lWBejg&index=2', itag: 136 });

  res.setHeader('Contet-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
  stream?.pipe(res);
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
