import { app } from '../Config'
import { getStorage } from "firebase/storage";

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)