let realData = "";
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const btn = document.getElementById('btn');
const tweetMe = document.getElementById('tweetMe');
let quotesData = "";

AOS.init();

const tweetNow = () => {
    let tweetPost = `https://twitter.com/intent/tweet?text=${quotesData.text} ${quotesData.author}`;
    window.open(tweetPost);
}

const getNewQuotes = () => {
    let rNum = Math.floor(Math.random() * 16);
    quotesData = realData[rNum];
    quote.innerText = quotesData.text;
    author.innerText = quotesData.author ?? "Unknown";
}

const getQuotes = async () => {
    const api = "https://type.fit/api/quotes";
    try{
        let data = await fetch(api);
        realData = await data.json();

        getNewQuotes();
        // console.log(realData.length);
        // console.log(realData[10].text);
    } catch(error) {

    }

}

btn.addEventListener('click',getNewQuotes);
tweetMe.addEventListener('click',tweetNow);


getQuotes();