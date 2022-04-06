var express = require("express");
const cors = require("cors");

const https = require("https");
var app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-TypeError, Accept, Autorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  next();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  https
    .get(
      "https://api.opensea.io/api/v1/collections?asset_owner=0x495f947276749Ce646f68AC8c248420045cb7b5e&offset=0&limit=300",
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          const userData = JSON.parse(data);
          var infoTable = new Array();

          for (let i = 0; i < userData.length; i++) {
            infoTable.push({
              name: userData[i].name,
              thirty_day_sales: userData[i].stats.thirty_day_sales,
              thirty_day_average_price:
                userData[i].stats.thirty_day_average_price,
              external_url: userData[i].external_url,
            });
          }

          res.send(infoTable);
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

app.post("/", function (req, res) {
  const name = req.body;
  console.log(name);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
