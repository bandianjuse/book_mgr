/*
* 日志模块
*/

var log4js = require('log4js');
var config = require('../config');

module.exports = function(){
    // 设置日志
    log4js.configure({
        appenders: [
            { type: 'console' },
            {
                type: 'file', //文件输出
                filename: 'logs',
                maxLogSize: 1024,
                backups:3,
                category: 'normal'
            }
        ],
        replaceConsole: true
    });
    var logger = log4js.getLogger();
    logger.setLevel('INFO');

    return log4js.connectLogger(logger, {level: 'auto', format:':method :url'});
};
