const app = require("./expressApp");

const ConnectDB = require("./db");

ConnectDB();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});