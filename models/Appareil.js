const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const AutoIncrement = require('mongoose-sequence')(mongoose);

let appareilSchema = new Schema({
    _id: {
        type: Number
    },
    Device_name: {
        type: String
    },
    Temperature: {
        type: Number
    },
    Humidity: {
        type: Number
    }
})

appareilSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Appareil', appareilSchema)
