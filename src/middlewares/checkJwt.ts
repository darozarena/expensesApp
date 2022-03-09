import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: 'undefined',
  issuerBaseURL: `https://dev-m2h8onbq.us.auth0.com/`,
});
