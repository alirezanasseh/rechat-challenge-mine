import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as Page from './pages';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={Page.Home}/>
                <Route path={'/edit/:id'} component={Page.Edit}/>
                <Route path={'/activities'} component={Page.Activities}/>
            </Switch>
        </Router>
    );
}

export default App;

// Icon credits
// <div>Icons made by <a href="" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
