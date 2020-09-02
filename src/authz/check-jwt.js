const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const dotenv = require("dotenv");

dotenv.config();

const AUDIENCE = process.env.AUTH0_AUDIENCE;
const ISSUER = process.env.AUTH0_ISSUER;

if (!AUDIENCE || !ISSUER) {
  throw new Error("Please make sure that .env is in place and populated");
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${ISSUER}.well-known/jwks.json`,
  }),

  audience: AUDIENCE,
  issuer: ISSUER,
  algorithms: ["RS256"],
});

module.exports = {
  checkJwt,
};
