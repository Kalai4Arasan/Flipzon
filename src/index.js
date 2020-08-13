import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min"

const routes=Routes()
ReactDOM.render(
  routes,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
