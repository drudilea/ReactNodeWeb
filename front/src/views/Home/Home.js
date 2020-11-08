import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { Layout } from 'antd';

import Sidebar from '../../components/shared/Sidebar';
import Posts from './Posts/Posts';
import Photos from './Photos/Photos';

const Home = () => {
  let match = useRouteMatch();
  return (
    <Layout>
      <Sidebar></Sidebar>

      <Layout>
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            {/* <Route exact path="/profile" component={Profile} /> */}
            <Route exact path={`${match.path}/ext/posts`} component={Posts} />
            <Route exact path={`${match.path}/ext/photos`} component={Photos} />
            <Route exact path={`${match.path}`}>
              <Redirect to={`${match.path}/ext/posts`} />
            </Route>
          </Switch>
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          Conexa App ©2020 Created by Leandro Drudi
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
