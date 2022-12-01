const mongoose = require('mongoose');

const { mongoDB_URL } = process.env



exports.connectDb = () => {
    mongoose.connect(mongoDB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((con) => {
            console.log(`atabase connected succesfully : ${con.connection.host}`)
        })
        .catch((error) => {
            console.log("Database connection failed.. ")
            console.log("Database Error" + error)
        }
        )
}

