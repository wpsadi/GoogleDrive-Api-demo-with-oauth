import  { Client } from "node-appwrite"
import { config } from "dotenv";
config();


const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
.setKey(process.env.APPWRITE_API_KEY);


export default client