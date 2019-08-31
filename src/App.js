import React from 'react';
import './App.css';

class App extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      author: "",
      quotes: []
    };
  };
  
  componentDidMount() {
    this.getQuotes();
    
  }
  
  getQuotes() {
    var self = this;
    return $.ajax({
      headers: {
        Accept: "application/json"
      },
      url: 'https://gist.githubusercontent.com/jemimaabu/07d9e9d7e7fc0b5f7008d0fc462ff9c2/raw/efe2e9cbb0fba82c4c216ba2b8d7c273af4324cf/literary-sexts.json',
      success: function(jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
          var quotesData = JSON.parse(jsonQuotes);
          self.setState({
            quotes: quotesData.quotes
          })
          self.getRandomQuote();
        }
      }
    });
  }
  
  getRandomQuote() {
    var quotes = this.state.quotes;
    var i = Math.floor(Math.random() * quotes.length);
    this.setState({
      text: quotes[i]["text"].trim(),
      author: quotes[i]["source"].trim()
    })
  }
 
  render() {
    const { text, author } = this.state; 
    return (
      <main id="quote-component">
        <header>
          <h1>Literary Sexts</h1>
          <p>A collection of quotes from <a href="https://www.tumblr.com/search/literary+sexts" target="_blank">tumblr.com</a></p>
        </header>
        <div id="quote-box">
          <q 
            id="text" 
            dangerouslySetInnerHTML={{__html: text}} />
          <p 
            id="author"
            dangerouslySetInnerHTML={{__html: author}} />
          <button onClick = {() => this.getRandomQuote()} id="new-quote">New quote</button>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURI("\"" + text + "\""+ "\n \n" + "https://codepen.io/Jemimaabu/pen/bGbRzea")}`} id="tweet-quote" target="_blank">
            <small>Tweet</small>
          </a>
        </div>
      </main>
    );
  }
}

export default App;