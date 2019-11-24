import { Router } from 'express';

import ValidatorsSessionStore from './app/validators/SessionStore';

import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Server is running!!!');
});

routes.post('/session', ValidatorsSessionStore, SessionController.store);

export default routes;
