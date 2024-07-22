import { Databases } from "node-appwrite";
import client from "../AWinit.js";

const db = new Databases(client)


export default db