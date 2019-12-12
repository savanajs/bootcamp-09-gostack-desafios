import { Router } from 'express';

import ValidatorsSessionStore from './app/validators/SessionStore';
import ValidatorsStudentStore from './app/validators/StudentStore';
import ValidatorsPlanStore from './app/validators/PlanStore';
import ValidatorsEnrollmentStore from './app/validators/EnrollmentStore';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinStudentController from './app/controllers/CheckinStudentController';
import HelpOrderStudentController from './app/controllers/HelpOrderStudentController';
import AnswerStudentController from './app/controllers/AnswerStudentController';
import NotificationsController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Server is running!!!');
});

routes.post('/session', ValidatorsSessionStore, SessionController.store);

routes.use(authMiddleware);

/*
 * Students Route
 */

routes.get('/students', StudentController.index);
routes.post('/students', ValidatorsStudentStore, StudentController.store);

/*
 * Checkin Route
 */
routes.get('/students/:student_id/checkins', CheckinStudentController.index);
routes.post('/students/:student_id/checkins', CheckinStudentController.store);

/*
 * Help Order Route
 */
routes.get(
  '/students/:student_id/help-orders',
  HelpOrderStudentController.index
);
routes.post(
  '/students/:student_id/help-orders',
  HelpOrderStudentController.store
);
routes.patch('/help-orders/:id/answer', AnswerStudentController.update);

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
routes.post(
  '/enrollments',
  ValidatorsEnrollmentStore,
  EnrollmentController.store
);
routes.put(
  '/enrollments/:id',
  ValidatorsEnrollmentStore,
  EnrollmentController.update
);
routes.delete('/enrollments/:id', EnrollmentController.destroy);

/*
 * Notifications
 */
routes.get('/notifications', NotificationsController.index);

export default routes;
