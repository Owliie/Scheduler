import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './App.module.scss';
import Header from './components/common/Header/Header';
import Routes from './components/Routes';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}

export default App;
