document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote-text');
    const newQuoteBtn = document.querySelector('.new-quote-btn');

    const fetchRandomQuote = async () => {
        try {
            const res = await fetch('http://192.168.0.104:8443/proxy/3000/quotes/random');
            const data = await res.json();
            if (data && data.text) {
                quoteText.textContent = data.text;
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