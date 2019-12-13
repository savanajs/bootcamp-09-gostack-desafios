import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import CreateStudent from '../pages/CreateStudent';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/students" component={Students} />
        <Route path="/create-student" component={CreateStudent} />
      </Switch>
    </BrowserRouter>
  );
}
