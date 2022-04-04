const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  const csvData = {
    HIGHDEGREE: {},
    LOCALE: {},
    CCSIZSET: {},
  };
  fs.readFile(
    path.resolve(__dirname, "../college_search_data/fields.csv"),
    "utf8",
    (err, data) => {
      const splitData = [];
      const dataArr = data.split(",,,");
      for (let i = 0; i < dataArr.length; i += 1) {
        splitData.push(dataArr[i].split('"'));
      }
      let key = "HIGHDEGREE";

      // clean up csv file to send in a convenient structure

      for (let i = 1; i < splitData.length; i += 1) {
        if (i > 5) key = "LOCALE";
        if (i > 17) key = "CCSIZSET";

        if (splitData[i].length === 1) {
          splitData[i] = splitData[i][0].split(",");
        }

        if (splitData[i][0].includes(","))
          splitData[i][0] = splitData[i][0].slice(
            0,
            splitData[i][0].indexOf(",")
          );

        if (splitData[i][1].includes("\n")) {
          csvData[key][splitData[i][0]] = splitData[i][1].slice(
            0,
            splitData[i][1].indexOf("\n")
          );
        } else {
          // eslint-disable-next-line prefer-destructuring
          csvData[key][splitData[i][0]] = splitData[i][1];
        }
      }
      return res.send(csvData).status(200);
    }
  );
});

// local 404 handler
app.use((req, res) => res.status(404).send("404: PAGE DOES NOT EXIST"));

// Global error handling middleware
app.use((err, req, res) => res.status(500).json(err));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
