// config/config.js
import dotenv from 'dotenv';


dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
export const tokenExpiry = process.env.TOKEN_EXPIRY || '7d'; 
;



