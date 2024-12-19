const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const admin = require("firebase-admin")

const serviceAccount = require("./config.json") // REFERENCE YOUR SERVICE ACCOUNT FIREBASE ADMIN SDK FILE HERE
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "<DATABASE_URL>"
})

const db = admin.database()
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/balance/:username", async (req, res) => {
	const { username } = req.params;
	const ref = db.ref("players").child(username)

	try {
		const snapshot = await ref.once("value")

		if (!snapshot.exists()) {
			await ref.set({ coins: 0 })
			return res.json({ coins: 0 })
		}

		const balance = snapshot.val()
		res.json(balance)
	} catch (err) {
		res.status(500).send("Error fetching balance")
	}
})

app.post("/balance/:username", async (req, res) => {
	const { username } = req.params
	const { coins } = req.body

	if (typeof coins !== "number") {
		return res.status(400).send("Invalid coins amount")
	}

	try {
		const ref = db.ref("players").child(username)
		await ref.set({ coins })
		res.json({ message: "Balance updated successfully", coins })
	} catch (err) {
		res.status(500).send("Error updating balance")
	}
})

const PORT = 3000
app.listen(PORT, () => {
	console.log("running now")
})
