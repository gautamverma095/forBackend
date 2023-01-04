const mongoose = require("mongoose")
mongoose.set('strictQuery', false)


const connection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then((data) => {
        console.log(`connected with server ${data.connection.host}`);
    }).catch((err) => {
         console.log(`${err}: did not connected`);
    })
}

module.exports = {
    connection
}