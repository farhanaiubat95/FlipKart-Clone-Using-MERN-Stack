// env var is used to store the server port and port number in the environment variable for later use in the application configuration 

import dotenv from 'dotenv';
dotenv.config();

const serverPort = process.env.SERVER_PORT || 5001;
export default serverPort;
