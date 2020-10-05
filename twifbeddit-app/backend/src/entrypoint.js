exports.lambdaHandler = async (event, _) => {
    if (event.path == "/randnum" && event.httpMethod == "GET")
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                num: Math.random()
            })
        }

        path = event.path.split('/');
        if (path.shift() != '')
            return {'statusCode': 500};
        try {
            request = require("./" + path[0]);
            path.shift()
            requestMethod = request[event.httpMethod];
        } catch (err) {
            console.error(err);
            return {
                'statusCode': 404,
                'body': JSON.stringify(err)
            }
        }
        
        return await requestMethod(path, event);
};
