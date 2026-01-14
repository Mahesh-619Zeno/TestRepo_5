const cache = {};
const keys = ['a', 'b', 'c', 'd'];

function storeInCache(key, value) {
    cache[key] = value;
    if (Math.random() > 0.9) {
        throw new Error('Simulated cache error');
    }
}

function simulateCache() {
    setInterval(() => {
        const key = keys[Math.floor(Math.random() * keys.length)];
        const value = Math.floor(Math.random() * 1000);
        try {
        storeInCache(key, value);
        } catch (error) {
        console.error('Caught a simulated cache error:', error.message);
        }
    }, 1000);
}

simulateCache();
console.log('Cache simulator started');