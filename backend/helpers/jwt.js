var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;

  return jwt({
    secret, // verify if the token input based on the same secret as before
    algorithms: ["HS256"], // algorithme used
    isRevoked: isRevoked, // to verify if user is admin or not
  }).unless({
    path: [
      // api excluded from authorization
      `${api}/users/login`,
      `${api}/users/register`,
      // exclude certain methode of the api
      // use regular expression to say all api belongs to it
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  });
}

// req: sending by users, payload: data inside token
async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    // reject the token bcs users is not admin
    return true;
  }

  return undefined;
}

module.exports = authJwt;
