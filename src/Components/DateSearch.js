import React, { Component } from 'react'
//import Typography from '@material-ui/core/Typography';

class DateSearch extends Component {

    constructor(props) {
      super(props);
            this.state = {
              byDate: '',
              results: [],
      };
    }
     
onChange = () => {
      this.setState({ results: this.state.byDate
      }, () => {
        if (this.state.byDate && this.state.byDate.length > 1) {
          if (this.state.byDate.length % 2 === 0) {
            this.getArticle()
          }
        } else if (!this.state.byDate) {
          return ("Results not found")
        }
      })
    }

getArticle = () => {
      fetch ( `http://hn.algolia.com/api/v1/search_by_date?query= ${byDate} `)
      .then (res => res.json())
      // .then (res => console.log ("made it"))
      .then( data  => {this.setState({
          results: data.hits})
      })
      .catch (error => console.log("error", error))
    }   

render() {
  return (  
     <div>
        <h2>Search by Date</h2>
        <form onSubmit = {this.onChange}>
          <input type= "text"  
           name="byDate"  
           value={this.state.byDate}
           onChange={this.onChange}/>
       </form>
       <ul>
         {this.state.results.map((result,index) =>
            <p className="m-t" key={index+1}>
             <h4>{result.hits.byDate}</h4>
             <span>{result.hits.url}</span>
           </p>
           )}
       </ul>
      </div>
    ) 
}
}

export default DateSearch
