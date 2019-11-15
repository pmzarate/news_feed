import React, { Component } from 'react'
//import Typography from '@material-ui/core/Typography';

class TermSearch extends Component {

      constructor(props) {
          super(props);
          this.state = {
                term : '',
                news : []
              };
          }

 onChange = (e) => {
         //g ("made it here on click")
          e.preventDefault();
          this.getArticle(this.state.term);
          }

  getArticle = (value) => {
          fetch (`http://hn.algolia.com/api/v1/search?query= ${value}`)
          .then (res => res.json())
          .then (data => {
            // console.log (data)
                if ( data.hits.length === 0 ) {
                  this.setState({ news: [{title: 'No Results found'}]  });
            } else {
                 this.setState({ news: data.hits });
            }})
            .catch(error => alert(error.message)); 
          };

  
    
render() {
  console.log(this.state)
    return (
      <div className="termSearch">
        <h2>News Feed</h2>
            <input ref= "term"  onSubmit={this.onChange} type="term"
            name="term"   id="search-term"
            placeholder= "Search Term/Tag..."
            value={this.state.term}/>
        <button onClick={this.click}>Search</button>
    <ul>
          {this.state.news.map((news,index) => {
            return (    
          
              <div key = {index}>
                <p className="Author">{news.title}</p>
                <a href = {news.url}> { news.url} </a>
              </div>
            
              
        )})
            }
    </ul>        
      </div>
    ) 
  }
}

export default TermSearch