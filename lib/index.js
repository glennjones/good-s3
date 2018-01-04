const Stream = require('stream')
const Stringify = require('fast-safe-stringify')

function defaultDocValidator(doc) {
    const schema = Joi.object().keys({
        tags: Joi.array(),
        data: Joi.any()
    })

    return Joi.validate(doc, schema).error
}


class LogStream extends Stream.Writable {

    constructor(options) {
        if (!options) {
            throw new Error('No options')
        }

        super({ objectMode: true })

        //this.filePath = get(options, 'clientOptions')
        this.batchSize = 1 // = get(options, 'batchSize') || 1
        this.batch = []


        this.once('finish', function () {
            //this.emit('close')
        });
    }

    _write(record, encoding, next) {

        console.log(Stringify(record));
        next()

        /*
        if (this.docValidator(record) !== null) {
            return next()
        }
        this.batch.push(record)

        if (this.batch.length >= this.batchSize) {
            console.log(Stringify(batch));

            return next()
        } else {
            return next()
        }
        */
    }

}

module.exports = LogStream