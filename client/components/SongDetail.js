import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import fetchSong from '../queries/fetchSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
	render() {
		return !this.props.data.loading ? (
			<div>
				<Link to="/">Back</Link>
				<h3>{this.props.data.song.title}</h3>
				<LyricList lyrics={this.props.data.song.lyrics} />
				<LyricCreate songId={this.props.params.id} />
			</div>
		) : (
			<div>loading...</div>
		)
	}
}

export default graphql(fetchSong, {
	options: (props) => {
		return { variables: { id: props.params.id } }
	},
})(SongDetail)
