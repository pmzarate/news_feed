import React, { Component } from 'react'
//import Typography from '@material-ui/core/Typography';

class TermSearch extends Component {

      constructor(props) {
          super(props);
          this.state = {
                term : '',
                news : [],
                author: '',
                date: '',
              };
          }

  onChange = (e) => {
         // ("made it here on click")
          this.setState({ term: e.target.value });
        }
  
  authorInput = (e) => {
          //console.log("made it to author");
          this.setState({ author: e.target.value });
        };

  dateInput = (e) => {
          //console.log("made it to date")
          this.setState({ date: e.target.value });
        };

  getArticle = (e) => {
    e.preventDefault();
          fetch (`http://hn.algolia.com/api/v1/search?query= ${this.state.term}`)
          .then (res => res.json())
          .then (data => {
            // console.log (data)
                if ( data.hits.length === 0 ) {
                  this.setState({ news: [{title: 'No Results found'}]  });
                } else {
                  this.setState({ term: '', news: data.hits });
            }})
          .catch(error => alert(error.message)); 
        };
          
          
  getAuthor = (e) => {
    e.preventDefault();
          fetch(
              `http://hn.algolia.com/api/v1/search?tags=author_${this.state.author}`
            )
          .then(res => res.json())
              // .then (res => console.log ("made it"))
          .then(data => {
               // console.log(data.hits, 'author');
                if (data.hits.length === 0) {
                  this.setState({ news: [{title: 'No Results found'}] });
                } else {
                  this.setState({ author: '', news: data.hits });
                }
            })
          .catch(error => alert(error.message));    
          };
  
  getByDate = (e) => {
    e.preventDefault();
          fetch(
            `http://hn.algolia.com/api/v1/search_by_date?query`
                    )
          .then(res => res.json())
              // .then (res => console.log ("made it"))
          .then(data => {
              // console.log(data.hits, 'date');
                if (data.hits.length === 0) {
                  this.setState({ news: [{title: 'No Results found'}] });
                  } else {
                  this.setState({ date: '', news: data.hits });
                  }
                  })
          .catch(error => alert(error.message));    
          };       
  

render() {
  console.log(this.state)
    return (
      <div className="termSearch">
        {/* <h2>News Feed</h2> */}
        <br/>
          <form onSubmit ={this.getArticle}>
            <input
              placeholder="search by term/tag"
              onChange={this.onChange}
              value={this.state.term}
              name="Search term"></input>
                <button type="submit">submit</button>
          </form>
        <br/>
          <form onSubmit={this.getAuthor}>
			 	   	<input
					   	placeholder="search by Author"
				      onChange={this.authorInput}
				     	value={this.state.author}
					    name="Search Author"
			   	  	></input>
			        	<button type="submit">submit</button>
			   	</form>
        <br/>
          <form onSubmit={this.getByDate}>
			 	   	<input
					   	placeholder="search by Most Recent Articles"
				      onChange={this.dateInput}
				     	value={this.state.date}
					    name="Search By Date"
			   	  	></input>
			        	<button type="submit">submit</button>
			   	</form> 
	          <div className="article-list">
              {this.state.news.map((a, i) => {
            return (
                <div key={i} className="article">
                    <h3> {a.title} </h3>
                    <h5> {a.author}</h5>
                    <a href={a.url} className='url path'/>
                  <br/>
                </div>
            )})}
          </div>
      </div>
    );
  }
}
export default TermSearch
