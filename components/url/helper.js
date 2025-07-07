const RADIX_BASE = 36;

const hashUrl = value => Number(value).toString(RADIX_BASE);

module.exports = {
    hashUrl
}