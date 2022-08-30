const express = require("express");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const app = express();

const port = 8088;

const readHeaders = (req, res, next) => {
  console.log({ headers: req.headers });
  next();
};

const checkJwt = auth({
  audience: "tyo4Jc50UH3GEQI4cne5XugBiL8SjWqd",
  issuerBaseURL: `https://dev-11plaq96.us.auth0.com/`,
});

app.get("/categories", (req, res) => {
  console.log({ reqAuth: req.auth });
  res.json([
    { id: 1, name: "categorie1" },
    { id: 2, name: "categorie2" },
    { id: 3, name: "categorie3" },
  ]);
});

app.get("/protected", readHeaders, checkJwt, (req, res) => {
  console.log({ reqAuth: req.auth });
  res.json({ message: "Response from backend" });
});

function error(err, req, res, next) {
  console.error(err.stack, req.url);

  if (err.name === "InvalidTokenError") {
    res.status(403).json({ message: "invalid token..." });
  } else {
    res.status(500);
    res.json({ message: "Internal Server Error" });
  }
}

app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
