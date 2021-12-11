import winston from 'winston'

const LOGGER_LEVELS = {
    levels: {
        critical: 0,
        error: 1,
        warn: 2,
        info: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        critical: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        verbose: 'white',
        debug: 'white',
        silly: 'white'
    }
}

winston.addColors(LOGGER_LEVELS.colors)

export const getLoggerFor = (context: string) => {
    const transports = [new winston.transports.File({ filename: 'logs.log' })]
    const logger = winston.createLogger({
        levels: LOGGER_LEVELS.levels,
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf((log: any) => {
                return `[api]-[${log.timestamp}]-[${log.level.toUpperCase()}]-[${context}]: ${log.message}`
            })
        ),
        transports: transports
    })

    logger.add(new winston.transports.Console())
    return logger
}
