const Stream = require('stream');
const Stringify = require('fast-safe-stringify');
const S3StreamLogger = require('s3-streamlogger').S3StreamLogger;
const Joi = require('joi');

function optionsValidator(options) {
    const schema = Joi.object().keys({
        bucket: Joi.string(),
        folder: Joi.string(),
        key: Joi.string(),
        secret: Joi.string(),
    })

    return Joi.validate(options, schema)
}


class LogStream extends Stream.Writable {

    constructor(options) {


        if (optionsValidator(options).error){
            throw new Error(optionsValidator(options))
        }

        super({ objectMode: true })

        this.bucket = options.bucket || '';
        this.folder = options.folder || '';
        this.key = options.key || '';
        this.secret = options.secret || '';

        this.s3stream = new S3StreamLogger({
            bucket: this.bucket,
            folder: this.folder,
            access_key_id: this.key,
            secret_access_key: this.secret
        });
        s3stream.write("hello S3");


        this.once('finish', function () {
            //this.emit('close')
        });
    }

    _write(record, encoding, next) {

        console.log(Stringify(record));
        s3stream.write(Stringify(record));
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