import { Router } from 'express';

import ValidatorsSessionStore from './app/validators/SessionStore';
import ValidatorsStudentStore from './app/validators/StudentStore';
import ValidatorsPlanStore from './app/validators/PlanStore';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Server is running!!!');
});

routes.post('/session', ValidatorsSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', ValidatorsStudentStore, StudentController.store);

/*
 * Plans Route
 */
routes.get('/plans', PlanController.index);
routes.post('/plans', ValidatorsPlanStore, PlanController.store);
routes.put('/plans/:id', ValidatorsPlanStore, PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

/*
 * Enrollment Route
 */
routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.destroy);

export default routes;
