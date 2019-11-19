import React, { Component } from "react";
//import Typography from '@material-ui/core/Typography';

class AuthorSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: "",
			news: []
		};
	}

	authorInput = (e) => {
		console.log("made it here on click");
		this.setState({ author: e.target.value });
	};

	getAuthor = (e) => {
		e.preventDefault();
		fetch(
			`http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.author}`
		)
			.then(res => res.json())
			// .then (res => console.log ("made it"))
			.then(data => {
				console.log(data.hits, 'author');
				this.setState({ author: "", news: data.hits });
			});
	};

	render() {
		console.log(this.state);
		return (
			<div className="authorSearch">
				{/* <h2>News Feed</h2> */}
				<form onSubmit={this.getAuthor}>
					<input
						placeholder="search by Author"
					  onChange={this.authorInput}
						value={this.state.author}
						name="Search Author"
					></input>
					<button type="submit">submit</button>
				</form>
				<div className="article-list">
					{this.state.news.map((a, i) => {
						return (
							<div key={i} className="article">
								{a.title} {a.author}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default AuthorSearch;
