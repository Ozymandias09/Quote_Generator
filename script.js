
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//Pegar as citações da API//
async function getQuote() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try {
    const response = await fetch( proxyUrl+apiUrl);
    const data = await response.json();
    //Se o autor estiver em branco, a resposta será unknown.
    if(data.quoteAuthor===''){
        authorText.innerHTML = "unknow"
    }else{
        authorText.innerText = data.quoteAuthor;
    }
    
    //Reduz tamanho da citação longa
    if(data.quoteText.length >120){
        quoteText.classList.add("Long Quote");
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    
} catch (error) {
    getQuote();
  
}
}
//tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = 'https://twitter.com/intent/tweet?text=${quote} - ${author}';
    window.open(twitterUrl,'_blank');

}
//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);
//carregamento
getQuote();