const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    judul: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
    },
    selesai: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', taskSchema)