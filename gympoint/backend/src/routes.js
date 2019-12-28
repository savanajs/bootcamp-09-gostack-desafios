import { Router } from 'express';

import ValidatorsSessionStore from './app/validators/SessionStore';
import ValidatorsSessionStudentStore from './app/validators/SessionStudentStore';
import ValidatorsStudentStore from './app/validators/StudentStore';
import ValidatorsPlanStore from './app/validators/PlanStore';
import ValidatorsEnrollmentStore from './app/validators/EnrollmentStore';

import SessionController from './app/controllers/SessionController';
import SessionStudentController from './app/controllers/SessionStudentController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinStudentController from './app/controllers/CheckinStudentController';
import HelpOrderStudentController from './app/controllers/HelpOrderStudentController';
import NotificationsController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Server is running!!!');
});

routes.post('/session', ValidatorsSessionStore, SessionController.store);
routes.post(
  '/session/student',
  ValidatorsSessionStudentStore,
  SessionStudentController.store
);

routes.use(authMiddleware);

/*
 * Students Route
 */

routes.get('/students', StudentController.index);
routes.get('/student/:id', StudentController.show);
routes.post('/students', ValidatorsStudentStore, StudentController.store);
routes.put('/students/:id', ValidatorsStudentStore, StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

/*
 * Checkin Route
 */
routes.get('/students/:student_id/checkins', CheckinStudentController.index);
routes.post('/students/:student_id/checkins', CheckinStudentController.store);

/*
 * Help Order Route
 */
routes.get('/help-orders', HelpOrderStudentController.index);

routes.get(
  '/students/:student_id/help-orders',
  HelpOrderStudentController.getByStudent
);

routes.post(
  '/students/:student_id/help-orders',
  HelpOrderStudentController.createByStudent
);
routes.patch(
  '/help-orders/:id/answer',
  HelpOrderStudentController.updateAnwserByStudent
);

/*
 * Plans Route
 */
routes.get('/plans', PlanController.index);
routes.get('/plan/:id', PlanController.show);
routes.post('/plans', ValidatorsPlanStore, PlanController.store);
routes.put('/plans/:id', ValidatorsPlanStore, PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

/*
 * Enrollment Route
 */
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollment/:id', EnrollmentController.show);
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
