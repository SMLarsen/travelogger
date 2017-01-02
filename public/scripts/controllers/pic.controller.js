app.controller("PicController", ['AuthFactory', 'MyTripFactory', '$scope', '$filter', function(AuthFactory, MyTripFactory, $scope, $filter) {
    console.log('PicController started');
    var self = this;
    var myTripFactory = MyTripFactory;
    var authFactory = AuthFactory;
    var userID = "";
    self.photoArray = [];

    getPhotos();

    // Get photos for all trips and days for the user
    function getPhotos() {
      return myTripFactory.getTrips()
          .then(function(response) {
                  var trips = response;
                  trips.forEach(buildPicArray);
                  userID = trips[0].user_id;
                  // Get all days for the user
                  myTripFactory.getUserDays(userID)
                      .then(function(response) {
                              var days = response;
                              days.forEach(buildPicArray);
                              console.log("photoArray:", self.photoArray);
                              $scope.$apply();
                          },
                          function(err) {
                              console.log('Error getting days for pics', err);
                          });
              },
              function(err) {
                  console.log('Error getting trips for pics', err);
              });
    }

    function buildPicArray(item, index) {
        var pic = {
            photo_url: item.photo_url,
            photo_caption: item.photo_caption
        };
        if (item.photo_url) {
            self.photoArray.push(pic);
        }
    }

}]); // END: PicController
