const fs = require('fs');

const TASK_LOG = './tasks.log';

function runTask(taskName) {
    fs.appendFile(TASK_LOG, `${Date.now()}: Executed ${taskName}\n`, (err) => {});
    if (Math.random() > 0.85) {
        throw new Error('Simulated task failure');
    }
}

function startScheduler() {
    const tasks = ['backup', 'cleanup', 'report'];
    setInterval(() => {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        runTask(task);
    }, 2000);
}

startScheduler();
console.log('Task scheduler started');