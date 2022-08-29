import logo from './logo.svg';
import './App.css';
import * as Sentry from "@sentry/react";
import {Link, Route, Switch, matchPath, BrowserRouter} from "react-router-dom";
import {BrowserTracing} from "@sentry/tracing";
import {createBrowserHistory} from 'history';
import packageJSON from "../package.json"

const history = createBrowserHistory();

const routes = [{ path: '/test/:id' }, { path: '/' }];
Sentry.init({
	dsn: "https://85b363dd1ef54eabbbce457d6da31ca4@o1382368.ingest.sentry.io/6697566",
	integrations: [
		new BrowserTracing({
			routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, routes, matchPath),
		}),
	],
	enabled: true, //!isDev()
	release: packageJSON.version,
	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,
});

function App() {
	const methodDoesNotExist = null
	return (
		<div className="App">
			<BrowserRouter>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<Link to={"/test/1"}>
						Learn React
					</Link>
					<Switch>
						<Route path={"/test/:id"} component={() => <button onClick={() => methodDoesNotExist()}>Break the world</button>} />
						<Route path={"*"} component={() => <div>Test page *</div>}/>
					</Switch>
				</header>
			</BrowserRouter>
		</div>
	);
}

export default Sentry.withProfiler(App);
