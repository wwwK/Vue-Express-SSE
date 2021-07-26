import express from 'express';
const router = express.Router();

import { badRequest } from '~/helper/customError';
import { EventEmitter } from 'stream';

const emitter = new EventEmitter();

let users = new Set();

router.get('/overCheck',  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { name } = req.query;

    if (users.has(name)) return badRequest(res, '중복된 닉네임입니다.');
 
    return res.json({
      success: true,
      message: `사용 가능한 닉네임 입니다..`,
    });
  } catch (error) {
    return badRequest(res, '업체 상세조회에 실패하였습니다.');
  }
});

router.get('/',  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { name } = req.query;

    res.writeHead(200, {
      'Content-Type': 'text/event-stream'
    });

    emitter.on('enter', (value) => {
      res.write(`data: ${value}님이 입장했습니다\n\n`);
    });

    emitter.on('send', (value) => {
      res.write(`data: ${value}\n\n`);
    });
    
    emitter.on('kick', (value) => {
      if (value === name)  return res.end();
      res.write(`data: ${value}님을 강퇴합니다\n\n`);
    });

    if (!users.has(name)) {
      users.add(name);
      emitter.emit('enter', name);
    }

    res.on('close', () => {
      console.log('lost connection');
    });

  } catch (error) {
    return badRequest(res, '업체 조회에 실패하였습니다.');
  }
});

router.get('/in', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { msg } = req.query as any;

    if (msg === undefined) return badRequest(res, '내용이 누락됬습니다');

    emitter.emit('send', msg);

    return res.json({
      success: true,
      message: `성공하였습니다.`,
      data: msg,
    });
  } catch (error) {
    return badRequest(res, '업체 상세조회에 실패하였습니다.');
  }
});


router.delete('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { name } = req.query as any;

    if (name === undefined) return badRequest(res, 'name 가 누락됬습니다');
    if (!users.has(name)) return badRequest(res, '없는 유저 입니다.');

    users.delete(name);

    emitter.emit('send', `${name} 님이 퇴장하였습니다.`);

    return res.json({
      success: true,
      message: `퇴장완료`,
    });
  } catch (error) {
    return badRequest(res, '업체 상세조회에 실패하였습니다.');
  }
});


router.get('/how', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    return res.json({
      success: true,
      message: `조회`,
      data: users
    });
  } catch (error) {
    return badRequest(res, '업체 상세조회에 실패하였습니다.');
  }
});

export default router;
