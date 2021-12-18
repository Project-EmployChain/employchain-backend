const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected")
}).catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose Disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
})