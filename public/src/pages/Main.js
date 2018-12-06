import React from 'react'
import Frame from './Frame';

import { Switch, Route } from 'react-router-dom'
import Front from './Front';
import TopRated from './TopRated';
import Explore from './Explore';
import MyBlog from './MyBlog';
import Profile from './Profile';
import Blog from '../pages/Blog';
import PostView from './PostView';

export default class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Frame>
                    <Switch>
                        <Route path='/posts/:id' component={PostView} />
                        <Route path='/blogs/:id' component={Blog} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/me' component={MyBlog} />
                        <Route path='/explore' component={Explore} />
                        <Route path='/top' component={TopRated} />
                        <Route path='/' component={Front} />
                    </Switch>
                </Frame>
            </div>
        )
    }
}