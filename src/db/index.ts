import { config }      from "@/config";
import { MongoClient } from "mongodb";

export async function setupDB(url: string | undefined = config.DATABASE_URL) {

    if (!url) {
        throw new Error('DATABASE_URL is not set.')
    }
    
    const client = new MongoClient(url);

    try {
        await client.connect();
    } catch(error) {
        // logger.error(error);
        process.exit(1);
    }

    const db = client.db(config.DATABASE_NAME);

    return { client, db }
}

export async function ping(client: MongoClient) {
    return client.db().admin().ping();
}

export async function tearDown(client: MongoClient) {
    await client.close();
}