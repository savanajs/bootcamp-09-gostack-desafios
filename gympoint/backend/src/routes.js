import { Router } from 'express';

import ValidatorsSessionStore from './app/validators/SessionStore';
import ValidatorsStudentStore from './app/validators/StudentStore';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Server is running!!!');
});

routes.post('/session', ValidatorsSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', ValidatorsStudentStore, StudentController.store);

export default routes;
