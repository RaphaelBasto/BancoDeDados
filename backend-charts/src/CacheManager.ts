import NodeCache from "node-cache";

class CacheManager
{
    cache: NodeCache;

    constructor()
    {
        this.cache = new NodeCache();
    }

    setValue( key: string, value )
    {
        try
        {
            this.cache.set(key, JSON.stringify(value) );
            return true;
        }
        catch( err )
        {
            console.error( err );
            return false;
        }
        
    }

    getValue( key: string )
    {
        try
        {
            return JSON.parse(this.cache.get(key));
        }
        catch( err )
        {
            console.error( err );
            return null;
        }
    }
}

const cacheManager = new CacheManager();

export default cacheManager;