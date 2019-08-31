//Code to scrape results from https://www.tumblr.com/search/literary+sexts into JSON object:
// Paste code into console when in the page above

  var posts = document.getElementsByClassName("quote")
  var data = { "quotes": [] };
  for (var i = 0; i<posts.length;i++) {
    var quote = {};
    quote.text = document.getElementsByClassName("quote")[i] ? document.getElementsByClassName("quote")[i].innerHTML : "";
    quote.source = document.getElementsByClassName("quote_source")[i] ? document.getElementsByClassName("quote_source")[i].innerHTML: "";
    if (quote.text.length > 0) {
      data["quotes"].push(quote);
      }
  }
  
//Paste the code below to copy results
  copy(data);
