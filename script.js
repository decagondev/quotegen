document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote-text');
    const newQuoteBtn = document.querySelector('.new-quote-btn');

    const fetchRandomQuote = async () => {
        try {
            const res = await fetch('http://localhost:3010/quotes/random');
            const data = await res.json();
            if (data && data[0].text) {
                quoteText.textContent = data[0].text;
            } else {
                quoteText.textContent = 'Failed to fetch quote.';
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            quoteText.textContent = 'Failed to fetch quote.';
        }
    }

    newQuoteBtn.addEventListener('click', fetchRandomQuote);

    fetchRandomQuote();
});