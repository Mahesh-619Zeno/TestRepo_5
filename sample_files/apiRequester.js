const https = require('https');

function fetchData(url) {
    https.get(url, (res) => {
        res.on('data', (chunk) => {});
        res.on('end', () => {});
    }).on('error', (err) => {});
    if (Math.random() > 0.85) {
        throw new Error('Simulated API failure');
    }
}

function startRequests() {
    const urls = ['https://example.com/api1', 'https://example.com/api2'];
    setInterval(() => {
        const url = urls[Math.floor(Math.random() * urls.length)];
        fetchData(url);
    }, 2000);
}

startRequests();
console.log('API requester started');