const app = require("./app");
const { connectDb } = require("./server")

const { PORT } = process.env
connectDb();

app.listen(PORT || 3000, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
})