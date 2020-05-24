import ApolloClient from 'apollo-client'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import SongList from './components/SongList'
import App from './components/App'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'
import './style/style.css'

const client = new ApolloClient({
	dataIdFromObject: (o) => o.id,
})

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={SongList} />
					<Route path="/new" component={SongCreate} />
					<Route path="/:id" component={SongDetail} />
				</Route>
			</Router>
		</ApolloProvider>
	)
}

ReactDOM.render(<Root />, document.querySelector('#root'))
