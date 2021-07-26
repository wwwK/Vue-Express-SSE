import 'module-alias/register';
import dotenv from 'dotenv';
import { Server } from 'http';
import { createApp } from './express';

const path = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env' ;
dotenv.config({ path });

export const startServer = (): Promise<Server> => {
  const app = createApp();

  app.set('port', process.env.PORT || 8888);

  return new Promise((resolve) => {
    const server = app.listen(app.get('port'), () => {
      console.log(`${app.get('port')}번 포트에서 대기중`);
      resolve(server);
    });
  });
};

startServer().then(() => {
  console.log('NODE_ENV', process.env.NODE_ENV);
});