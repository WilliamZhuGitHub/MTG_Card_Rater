const config = {
    //connect to mongodb
    db: {
        username: "admin",
        //password: "tDoxP34UR2VbBb66",
        connection: "mongodb+srv://admin:tDoxP34UR2VbBb66@web-dev.nt241.mongodb.net/mtg_cards?retryWrites=true&w=majority"

    },
       //secret for Express Session
     expressSession: {
        secret: "adfsaasdfwefapwaefawefjioawefjoi"
    }
}

 
module.exports = config;