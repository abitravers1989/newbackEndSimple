module.exports = (name, defaultVal) => {
    if (
        (process.env[name] === undefined || process.env[name] === '')
    ) {
        throw new ReferenceError(`Environment variable ${name} is required`)
    }
    return process.env[name] || defaultVal
}