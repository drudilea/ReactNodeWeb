import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import { Layout } from 'antd';

import Sidebar from '../../components/shared/Sidebar';
import Posts from './Posts/Posts';
import Photos from './Photos/Photos';
import { useAuth } from '../../services/auth-service';

const Home = () => {
  const location = useLocation();
  let match = useRouteMatch();
  const auth = useAuth();
  return (
    <div style={{ height: '-webkit-fill-available' }}>
      {auth.user ? (
        <Layout style={{ height: '100%' }}>
          <Sidebar />

          <Layout>
            <Layout.Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route
                  exact
                  path={`${match.path}/ext/posts`}
                  component={Posts}
                />
                <Route
                  exact
                  path={`${match.path}/ext/photos`}
                  component={Photos}
                />
                {/* <Route exact path={`${match.path}`}>
                  <Redirect to={`${match.path}/ext/posts`} />
                </Route> */}
              </Switch>
            </Layout.Content>

            <Layout.Footer style={{ textAlign: 'center' }}>
              Conexa App ©2020 Created by Leandro Drudi
            </Layout.Footer>
          </Layout>
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </div>
  );
};

export default Home;
