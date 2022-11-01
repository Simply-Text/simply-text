

const typesenseConfig = {
    apiKey: "",
    hostName: "",
    collection: "Pages"
};
const Typesense = require('typesense');
const client = new Typesense.Client({
    'nodes': [{
        'host': typesenseConfig.hostName, 
        'port': '443',
        'protocol': 'https'
      }],
      'apiKey': typesenseConfig.apiKey,
      'connectionTimeoutSeconds': 2
});

const searchForText = async (word) => {
    try{
        return await client.collections(typesenseConfig.collection).documents().search({
            q:word,
            query_by:"Content"
        })
        
    }catch (e) {
        return e;
    }
}

export {searchForText};
