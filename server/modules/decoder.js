var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert("./server/firebase-service-account.json"),
    databaseURL: "https://travelogger-66f9b.firebaseio.com"
});

// Pull id_token off of request and verify it against firebase service account private_key; then add decodedToken
var tokenDecoder = function(req, res, next) {

    // if (req.headers.id_token) {
      // console.log('\n\n\nreq.headers.id_token', req.headers.id_token, '\n\n\n');
        admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
                // Add decodedToken to the request so that downstream processes can use it
                req.decodedToken = decodedToken;
                console.log('decoder decoded token:', req.decodedToken);
                next();
            })
            .catch(function(error) {
                // If id_token isn't right, return forbidden error
                console.log('User token could not be verified', error);
                res.sendStatus(403);
            });
    // } else {
    //     next();
    // }
};

module.exports = {
    token: tokenDecoder
};