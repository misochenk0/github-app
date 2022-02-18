import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
// import Popular from './component/Popular';
// import Battle from './component/Battle';
// import Results from './component/Results';
import {ThemeProvider} from './contexts/theme'
import Nav from './component/Nav';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation
} from "react-router-dom"
import Loading from './component/Loading';

const Popular = React.lazy(() => import("./component/Popular"))
const Battle = React.lazy(() => import("./component/Battle"))
const Results = React.lazy(() => import("./component/Results"))


const WrappedComponent = props => {
	const location = useLocation()

	return <Results location={location} {...props} />
}

function PageError() {
	return (
		<h1>404</h1>
	)
}

class App extends React.Component {

	state = {
		theme: 'light',
		toggleTheme: () => {
			this.setState(({theme}) => ({
				theme: theme === 'light' ? 'dark' : 'light'
			}))
		}
	}
	render() {
		

		return ( 
			
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className='container'>
							<Nav/>
							<React.Suspense fallback={<Loading/>}>
								<Routes>
									<Route path="*" element={<PageError/>}/>
									<Route exact path="/" element={<Popular/>}/>
									<Route path="battle" element={<Battle/>}/>
									<Route path="battle/results" element={<WrappedComponent/>} router={{location}}/>
								</Routes>
							</React.Suspense>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		)
	}
}


ReactDOM.render(<App/>, document.getElementById("app"))