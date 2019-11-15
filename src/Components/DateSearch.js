import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

class DateSearch extends Component {

    constructor(props) {
      super(props);
            this.state = {
              byDate: '',
              news: []
      };
    }
  
    
    getArticle = () => {
        fetch ( `http://hn.algolia.com/api/v1/search_by_date?query= ${this.state.byDate} `)
        .then (res => res.json())
        .then( data  => {console.log ("got it", data.hits);
          if (data.hits.length !== 0) {
              this.setState({news: data.hits});
              } else {
              this.setState({ news: [{title: 'No Results found'}] 
              });
            }}   
        );
    }

    onChange = (e) => {
      console.log ("made it here on click")
        this.setState({ byDate: e.target.value});
    }
    
render() {
  console.log(this.state)
    return (
     <div className="byDateSearch">
          <input ref= "byDate"  onChange={this.onChange} type="search"
           name="search-byDate"   id="search-byDate"
           placeholder= "Search By Date..."
           value={this.state.byDate}/>
        <button onClick={this.click}>Search</button>
          {this.state.news.map((news,index) => {
            return (
              <Typography>
              <div key = {index}>
                <p className="Author">{news.title}</p>
                <a href = {news.url}> { news.url} </a>
              </div>
              </Typography>
              );
          })}       
      </div>
    ) 
  }
}

export default DateSearch
