import { Client, Storage } from "appwrite"

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "680492b60027defd6668",
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || "680492f90013b4983440",
  url: import.meta.env.VITE_APPWRITE_URL || "https://fra.cloud.appwrite.io/v1",
}

export const client = new Client()

client.setEndpoint(appwriteConfig.url)
client.setProject(appwriteConfig.projectId)

export const storage = new Storage(client)
