
import dotenv from 'dotenv';
dotenv.config();

const store_id = process.env.STORE_ID || '';
const store_passwd = process.env.STORE_PASSWD || '';

export default { store_id, store_passwd};
