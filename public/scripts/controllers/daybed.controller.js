/*jshint esversion: 6 */
app.controller('DayBedController', ['MyTripFactory', 'NavFactory', 'NgMap', 'GeoCoder', '$routeParams', function(MyTripFactory, NavFactory, NgMap, GeoCoder, $routeParams) {
    console.log('DayBedController started');

    const myTripFactory = MyTripFactory;
    const navFactory = NavFactory;

    let self = this;
    self.tripID = $routeParams.tripID;
    self.data = myTripFactory.data;

    // Set left nav parameters
    navFactory.setNav('Add Lodging', '#/addday/' + self.tripID, true);

    self.lodgingTypes = ['Private Home', 'Airbnb', 'Booking.com', 'Expedia', 'Hotels.com', 'Camping', 'Other'];
    // Find location
    self.destinationChanged = function() {
        self.place = this.getPlace();
        // console.log('location', self.place);
        self.data.day.lodging_name = self.place.name;
        self.data.day.lodging_address = self.place.formatted_address;
        self.data.day.lodging_name = self.place.name;
        let location = self.place.geometry.location;
        self.lat = location.lat();
        self.lng = location.lng();
        self.data.day.lodging_map_location = {
            pos: [self.lat, self.lng]
        };
        self.map.setCenter(self.place.geometry.location);
        // NgMap.getMap().then(function(map) {
        //     self.map = map;
        // });
    };

    NgMap.getMap().then(function(map) {
        self.map = map;
    });

}]); // END: MyTripController
