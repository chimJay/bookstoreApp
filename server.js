const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({ path: ".env" })
const app = require("./app")

const PORT = process.env.PORT || 5000

//starting server
app.listen(PORT, function () {
  console.log(`server running at ${PORT}`)
})
