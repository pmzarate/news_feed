import React, { Component } from 'react'
//import Typography from '@material-ui/core/Typography';

class TermSearch extends Component {

      constructor(props) {
          super(props);
          this.state = {
                term : '',
                results : [],
            };
          }

onChange = () => {
      this.setState({ results: this.state.term
      }, () => {
        if (this.state.term && this.state.term.length > 1) {
          if (this.state.term.length % 2 === 0) {
            this.getArticle()
          }
        } else if (!this.state.term) {
          return ("Results not found")
        }
      })
    }

getArticle = () => {
      fetch (`http://hn.algolia.com/api/v1/search?query= ${ term }`)
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
        <h2>Search by Term</h2>
        <form onSubmit = {this.onChange}>
          <input type= "text"  
           name="term"  
           value={this.state.term}
           onChange={this.onChange}/>
       </form>
       <ul>
         {this.state.results.map((result,index) =>
            <p className="m-t" key={index+1}>
             <h4>{result.hits.title}</h4>
             <span>{result.hits.url}</span>
           </p>
           )}
       </ul>
      </div>
    ) 
}
}

export default TermSearch