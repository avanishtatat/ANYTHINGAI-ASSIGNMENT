const mongoose = require("mongoose"); 

const PemissionSchema = new mongoose.Schema({
  name: {type:String, required: true}
});

module.exports = mongoose.model('Pemission', PemissionSchema); 