const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let journalSchema = new Schema({
    title: String,
    entry: String,
    category: String,
    userId: String
});

journalSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, journals) => {
                if(!err) {
                    resolve(journals);
                } else {
                    reject(err);
                }
            });
        });
    }
};

var Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
