import * as express from 'express';
import { Tag, TagsServiceClient } from '@home/proto/tags';
import * as grpc from '@grpc/grpc-js';
import * as morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

const getTags = (tagIds: number[]) =>
  new Promise<Tag[]>((resolve, reject) => {
    const client = new TagsServiceClient(
      `localhost:50052`,
      grpc.credentials.createInsecure()
    );

    client.getTags({ tagIds }, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res.tags);
    });
  });

app.get('/tags', async (req, res) => {
  try {
    let tagIds: number[];
    if (Array.isArray(req.query.ids))
      tagIds = req.query.ids.map((v) => parseInt(v));
    else if (typeof req.query.ids == 'string')
      tagIds = [parseInt(req.query.ids)];
    else tagIds = [];
    res.send(await getTags(tagIds));
  } catch (err) {
    console.error(err);
    res.status(404).send('not found');
  }
});

app.listen(8001, () => console.log('listening on port 8001'));
