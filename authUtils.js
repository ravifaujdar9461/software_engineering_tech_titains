/*feat: add authentication utility functions using JWT and date formatting
****Implemented token-based authentication using jwt-decode
****Added helper to validate user from request headers
****Integrated MirageJS response handling for unauthorized access
****Included utility function for standardized date formatting*/

import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

/* feat: implement authentication guard to validate incoming requests
*** Extracts JWT token from request headers***
** Decodes token to retrieve user email
** Verifies user existence in mock database
**Returns user ID if authenticated, else returns 401 error response*/

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization; // extract token from headers

  const decodedToken = jwt_decode(
    encodedToken,
    process.env.REACT_APP_JWT_SECRET // decode using secret key
  );

  if (decodedToken) {
    const user = this.db.users.findBy({ email: decodedToken.email }); // find user in DB

    if (user) {
      return user._id; // return user ID if valid
    }
  }

  // return unauthorized error if token is invalid or user not found
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

/* feat: add utility function for consistent date-time formatting
/* Uses dayjs to generate ISO-like formatted timestamps */

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");