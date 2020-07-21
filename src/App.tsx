import React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/contacts/create';
import EditContact from './components/contacts/edit';

class App extends React.Component<RouteComponentProps<any>> {
    public render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={'/'}> Home </Link>
                        </li>
                        <li>
                            <Link to={'/create'}> Create Customer </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path={'/'} exact component={Home} />
                    <Route path={'/create'} exact component={Contact} />
                    <Route path={'/edit/:id'} exact component={EditContact} />
                </Switch>
            </div>
        );
    }
}
export default withRouter(App);