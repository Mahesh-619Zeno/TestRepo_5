const fs = require('fs');
const path = require('path');

const METRICS_DIR = './metrics';
const AGG_FILE = path.join(METRICS_DIR, 'aggregated.txt');

// Ensure metrics directory exists
if (!fs.existsSync(METRICS_DIR)) {
    fs.mkdirSync(METRICS_DIR, { recursive: true });
}

function writeMetric(metric) {
    fs.appendFile(AGG_FILE, metric + '\n', (err) => {
        if (err) {
            console.error('Error writing metric:', err);
        }
    });
}

function generateMetric() {
    return `${Date.now()}: Metric-${Math.floor(Math.random() * 1000)}`;
}

function startMetricsCollection() {
    setInterval(() => {
        const metric = generateMetric();
        writeMetric(metric);
    }, 1000);
}

startMetricsCollection();
console.log('Metrics collector started');
