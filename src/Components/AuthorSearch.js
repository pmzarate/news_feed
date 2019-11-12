import React, { Component } from 'react'
//import Typography from '@material-ui/core/Typography';

class AuthorSearch extends Component {

    constructor(props) {
      super(props);
        this.state = {
          author: '',
          results: [],
     }
   };
   
onChange = () => {
      this.setState({ results: this.state.author
      }, () => {
        if (this.state.author && this.state.author.length > 1) {
          if (this.state.author.length % 2 === 0) {
            this.getArticle()
          }
        } else if (!this.state.author) {
          return ("Results not found")
        }
      })
    }

getArticle = () => {
      fetch ( `http://hn.algolia.com/api/v1/search_by_author?query= ${ author }`)
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
        <h2>Search by Author</h2>
        <form onSubmit = {this.onChange}>
          <input type= "text"  
           name="query"  
           value={this.state.author}
           onChange={this.onChange}/>
       </form>
       <ul>
         {this.state.results.map((result,index) =>
            <p className="m-t" key={index+1}>
             <h4>{result.hits.author}</h4>
             <span>{result.hits.url}</span>
           </p>
           )}
       </ul>
      </div>
    ) 
}
}

export default AuthorSearch