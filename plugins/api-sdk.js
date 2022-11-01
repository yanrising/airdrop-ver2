import DevStoreClient from "@masterbranch1/devstore-client"
import { getConfig } from '../config'

const CONFIG = getConfig(process.env.NODE_ENV)

const client = new DevStoreClient({
    adminUrl: CONFIG.adminUrl,
    userUrl: CONFIG.userUrl,
    wsUrl: CONFIG.wsUrl,
});

export default client
