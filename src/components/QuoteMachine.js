import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
const twitterPrefix = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=';

const getRandomQuote = data => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

export default function QuoteMachine(props) {
    const [data, setData] = useState([]);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [tweetLink, setTweetLink] = useState("");

    // Fetch the quote data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
            const quoteObject = await response.json();
            setData(quoteObject.quotes);  
        }
        fetchData();
    }, []);

    // Update DOM after the data is fetched and the state has been updated
    useEffect(() => {
        // Skip the initialization phase (default value assign)
        if(data.length === 0) return;
        updateQuote();
    }, [data]);

    const updateQuote = () => {
        const quoteObject = getRandomQuote(data);
        setQuote(quoteObject.quote);
        setAuthor(quoteObject.author);
        setTweetLink(`${twitterPrefix}"${quoteObject.quote}" ${quoteObject.author}`);
        props.changeTheme();
    }

    return (
        <div id="flex-container">
            <div id="quote-box">
                <div id="text-container">
                    <Typography variant="h5" id="text" color="primary"><FormatQuoteIcon />{quote}</Typography>
                </div>
                <div id="author-container">
                    <Typography variant="subtitle1" id="author" color="primary">- {author}</Typography>
                </div>
                <div id="button-container">
                    <Button variant="contained" color="primary"><a href={tweetLink} target='_blank' id="tweet-quote"  rel="noopener noreferrer"><TwitterIcon /></a></Button>
                    <Button variant="contained" color="primary" onClick={updateQuote} id="new-quote">New quote</Button>
                </div>
            </div>
        </div>
    )
}