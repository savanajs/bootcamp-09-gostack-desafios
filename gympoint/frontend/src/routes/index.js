import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '../pages/Students';
import Plans from '../pages/Plans';
import Enrollments from '../pages/Enrollments';
import Helps from '../pages/Helps';

import SaveStudent from '../pages/SaveStudent';
import SavePlan from '../pages/SavePlan';
import SaveEnrollment from '../pages/SaveEnrollment';
import SaveHelp from '../pages/SaveHelp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/new" component={SaveStudent} isPrivate />
      <Route path="/students/edit/:id" component={SaveStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/new" component={SavePlan} isPrivate />
      <Route path="/plans/edit/:id" component={SavePlan} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route path="/enrollments/new" component={SaveEnrollment} isPrivate />
      <Route
        path="/enrollments/edit/:id"
        component={SaveEnrollment}
        isPrivate
      />

      <Route path="/helps" exact component={Helps} isPrivate />
      <Route path="/helps/new" component={SaveHelp} isPrivate />
      <Route path="/helps/edit/:id" component={SaveHelp} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
