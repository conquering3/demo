const dayjs = require('dayjs'),
    consoleLog = console.log,
    consoleWarn = console.warn,
    consoleError = console.error;


// 添加log，warn，error三者的输出时间和状态值
module.exports = () => {
    console.log = (...args) => consoleLog(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}][NORMAL]-`, ...args);
    console.warn = (...args) => consoleWarn(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}][WARN]-`, ...args);
    console.error = (...args) => consoleError(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}][ERROR]-`, ...args);
}