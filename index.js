const express = require("express");
const {google} = require("googleapis");

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets"
	})
	// create client intance for auth
	const client = await auth.getClient();

	// Instance of google sheetps api
	const googleSheets = google.sheets({version: "v4", auth: client});

	const spreadsheetId = "1OFBOOX4FtfzpJICTsvA4Nh8QlyJZQ26405iOxHfz2nc";
	//Get metadata about spreadsheet

	const metaData = await googleSheets.spreadsheets.get({
		auth,
		spreadsheetId,
	});


	//Read rows from spreadsheet
	const getRows = await googleSheets.spreadsheets.values.get({
		auth,
		spreadsheetId,
		range: "Hoja 1!A:A",
	})

	//wRATE WOR(S) TO SPREADSHEET
	await googleSheets.spreadsheets.values.append({
		auth,
		spreadsheetId,
		range: "Hoja 1!A:B",
		valueInputOption: "USER_ENTERED",
		resource: {
			values: [
				["make a tutorial", "test"]
			],
		}
	})
	res.send(getRows.data)
});


app.listen(port, (req, res) => console.log(`localhost${port}`));