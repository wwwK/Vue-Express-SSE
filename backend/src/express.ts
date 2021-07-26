
import express, { Application } from 'express';
import cors from 'cors'

import sseRouter from '~/routes/sse';
import indexRouter from '~/routes/index';

export const createApp = (): Application => {
  const app = express();


  var allowlist = ['https://g2.demasian.com', 'https://betag2.demasian.com'];

  if (process.env.NODE_ENV === 'beta') {
    allowlist.push('http://localhost:8080');
  }

  var corsOptionsDelegate = function (req: express.Request, callback: any) {
    var corsOptions;
    let dd: string = req.header('Origin') || '';
    if (
      allowlist.indexOf(dd) !== -1 ||
      process.env.NODE_ENV === 'local'
    ) {
      corsOptions = {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        maxAge: 3600,
      }; // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  app.use(cors(corsOptionsDelegate));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/', indexRouter);
  app.use('/sse', sseRouter);
  
  return app;
};