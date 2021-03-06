/*jshint esversion: 6 */
app.controller('MyTripController', ['MyTripFactory', 'AuthFactory', 'NavFactory', function(MyTripFactory, AuthFactory, NavFactory) {
    console.log('MyTripController started');

    const authFactory = AuthFactory;
    const currentUser = authFactory.currentUser;
    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.data = MyTripFactory.data;

    // Set left nav parameters
    navFactory.setNav('My Trips', '#/home', true);

    // Get all trips for the user
    myTripFactory.getTrips()
        .then(function(response) {
                self.data.trips.forEach(formatDates);
            },
            function(err) {
                console.log('Error getting trips', err);
            });

    // Function to set dates as date objects
    function formatDates(item, index) {
        item.begin_date = new Date(item.begin_date);
        item.end_date = new Date(item.end_date);
    } // End formatDates

    // Function to delete a trip
    self.deleteTrip = function(tripID) {
        console.log('tripID:', tripID);
        myTripFactory.deleteTrip(tripID)
            .then(function(response) {
                    myTripFactory.deleteTripDays(tripID)
                        .then(function(response) {
                                myTripFactory.getTrips()
                                    .then(function(response) {
                                            console.log('Trip deleted');
                                        },
                                        function(err) {
                                            console.log('Error getting trips after delete', err);
                                        });
                            },
                            function(err) {
                                console.log('Error deleting trip', err);
                            });
                },
                function(err) {
                    console.log('Unable to delete trip', err);
                });
    }; // End deleteTrip

}]); // END: MyTripController
