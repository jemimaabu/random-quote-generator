import React from 'react';
import './App.css';

class App extends React.Component {
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
    fetch('https://gist.githubusercontent.com/jemimaabu/07d9e9d7e7fc0b5f7008d0fc462ff9c2/raw/efe2e9cbb0fba82c4c216ba2b8d7c273af4324cf/literary-sexts.json')
      .then(function (response) { return response.json(); })
      .then(function (quotesData) {
        self.setState({
          quotes: quotesData.quotes
        })
        self.getRandomQuote();
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
          <p>A random quote from <a href="https://www.tumblr.com/search/literary+sexts" target="_blank"  rel="noopener noreferrer">tumblr.com</a></p>
        </header>
        <section id="quote-box">
          <q
            id="text"
            dangerouslySetInnerHTML={{ __html: text }} />
          <p
            id="author"
            dangerouslySetInnerHTML={{ __html: author }} />
          <button onClick={() => this.getRandomQuote()} id="new-quote">New quote</button>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURI("\"" + text + "\"" + "\n \n" + "https://randquotegenerator.netlify.com")}`} id="tweet-quote" target="_blank" rel="noopener noreferrer">
            <small>Tweet</small>
          </a>
        </section>
        <footer>
          Built by <a href="http://www.jemimaabu.com" target="_blank" rel="noopener noreferrer">Jemima</a>
        </footer>
      </main>
    );
  }
}

export default App;
