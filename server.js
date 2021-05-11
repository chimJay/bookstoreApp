const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({ path: ".env" })
const app = require("./app")

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected")
  })

const PORT = process.env.PORT || 5000

//starting server
app.listen(PORT, function () {
  console.log(`server running at ${PORT}`)
})
