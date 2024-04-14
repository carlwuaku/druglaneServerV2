const electronConfigs = require('./webpack.electron.js');
const reactConfigs = require('./webpack.react.js')
// const expressConfigs = require('./webpack.express.js');
module.exports = [
    reactConfigs,
    electronConfigs,
    
    
]