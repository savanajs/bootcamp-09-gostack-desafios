import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import SaveStudent from '../pages/SaveStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register-student" component={SaveStudent} isPrivate />
      <Route path="/edit-student/:id" exact component={SaveStudent} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
