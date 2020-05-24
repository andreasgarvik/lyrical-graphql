import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'
import query from '../queries/fetchSongs'

class SongList extends Component {
	onSongDelete(id) {
		this.props
			.mutate({
				variables: {
					id,
				},
			})
			.then(() => this.props.data.refetch())
	}

	renderSongs() {
		return !this.props.data.loading
			? this.props.data.songs.map(({ id, title }) => {
					return (
						<li key={id} className="collection-item">
							<Link to={`/${id}`}>{title}</Link>
							<i
								onClick={() => this.onSongDelete(id)}
								className="material-icons"
							>
								delete
							</i>
						</li>
					)
			  })
			: 'Loading...'
	}

	render() {
		return (
			<div>
				<ul className="collection">{this.renderSongs()}</ul>
				<Link to="/new" className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		)
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`

export default graphql(mutation)(graphql(query)(SongList))
