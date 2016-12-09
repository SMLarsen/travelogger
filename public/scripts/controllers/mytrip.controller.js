app.controller("MyTripController", ["$http", "AuthFactory", function($http, AuthFactory) {
    console.log('MyTripController started');
    var self = this;
    self.trips = [];
    var authFactory = AuthFactory;
    self.newTrip = {};
    self.newDay = {};

    self.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    self.oneAtATime = true;

    getTrips();

    // Function to GET trips
    function getTrips() {
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'GET',
                url: '/trip/' + loginUser.id,
                headers: {
                    id_token: loginUser.authIdToken
                }
            }).then(function(response) {
                    self.trips = response.data;
                    console.log('response.data', response.data);
                },
                function(err) {
                    console.log('Unable to retrieve trips', err);
                });
        });
    } // End getTrips

    // Function to add a trips
    self.addTrip = function() {
        console.log('addTrip', self.newTrip);
        authFactory.getIdToken().then(function(loginUser) {
            $http({
                method: 'POST',
                url: '/trip',
                headers: {
                    id_token: loginUser.authIdToken
                },
                data: self.newTrip
            }).then(function(response) {
                    console.log('Trip added');
                    self.getTrips();
                },
                function(err) {
                    console.log('Unable to add trip', err);
                });
        });
    }; // End addTrip

        // Function to add a day
        self.addDay = function() {
            console.log('addDay', self.newDay);
            authFactory.getIdToken().then(function(loginUser) {
                $http({
                    method: 'POST',
                    url: '/day',
                    headers: {
                        id_token: loginUser.authIdToken
                    },
                    data: self.newDay
                }).then(function(response) {
                        console.log('Day added');
                        self.getTrips();
                    },
                    function(err) {
                        console.log('Unable to add day', err);
                    });
            });
        }; // End addDay

}]); // END: TripController
