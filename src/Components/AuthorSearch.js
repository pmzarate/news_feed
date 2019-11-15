import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

class AuthorSearch extends Component {

      constructor(props) {
        super(props);
          this.state = {
            author: '',
            news: []
      }
    };

  getArticle = () => {
      fetch ( `http://hn.algolia.com/api/v1/search_by_author?query= ${ this.state.author }`)
      .then (res => res.json())
      // .then (res => console.log ("made it"))
      .then( data  => {console.log ("got it", data.hits);
            if (data.hits.length !==0) {
              this.setState({ news: data.hits});
          } else {
            this.setState({ news: [{title: 'No Results found'}] });
          }});
        };   

    onChange = (e) => {
      console.log ("made it here on click")
      this.setState({ author: e.target.value});
    }

render() {
  console.log (this.state)
  return (  
      <div className = "authorSearch">
            <input ref= "Author"  onChange={this.onChange} type="search"
            name="search-author"   id="search-author"
            placeholder= "Search by Author..."
            value={this.state.author}/>
              <button onClick={this.click}>Search</button>
            {this.state.news.map((news,index) => {
              return (
                <Typography>
                <div key = {index}>
                  <p className="Author"> {news.title} </p>
            <a href = {news.url}> {news.url} </a>
            </div>
            </Typography>
            );
        })}
      </div>
    ) 
  }
}

export default AuthorSearch

