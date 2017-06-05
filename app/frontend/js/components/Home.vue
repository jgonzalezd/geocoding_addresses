<template>
  <div class="container">
    <div class="row"><br>
      <div class="col-lg-12">

        <div class="jumbotron">
          <h1>Geocode</h1>
          <p>Use this simple app to geocode your addresses. Start by typing your address in the box below and select the desired address to store the geolocation in the DB</p>
          <!-- <p><a class="btn btn-primary btn-lg">Learn more</a></p> -->
        </div>
      </div>
    </div>
    <h3 class="text-center">Search Address</h3>
    <div class="row">
      <div class="col-lg-6 col-lg-offset-3">
        <form>
          <div class="form-group">
            <div class="input-group">
               <input v-model="address" type="text" class="form-control" placeholder="Type your address here..." name="search-input">
               <span class="input-group-btn">
                    <button v-on:click="search" class="btn btn-default" type="button" name="search-button">Go!</button>
               </span>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Results</h3>
          </div>
          <div class="panel-body">
            <span v-if="foundLocations.length == 0"> No results yet. Try typing an address to start searching... Example: <i>1600 Amphitheatre Parkway, Mountain View, CA</i> </span>
            <table v-else class="table table-striped">
            <thead>
              <tr>
                <th>City</th>
                <th>Subdivision</th>
                <th>State</th>
                <th>Country</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="foundLocation in foundLocations">
                <td>{{ foundLocation.locality }}</td>
                <td>{{ foundLocation.administrative_area_level_2 }}</td>
                <td>{{ foundLocation.administrative_area_level_1 }}</td>
                <td>{{ foundLocation.country }}</td>
                <td>{{ foundLocation.lat }}</td>
                <td>{{ foundLocation.lng }}</td>
                <td><button v-on:click="save(foundLocation.id)" type="button" name="button" class="btn btn-primary btn-xs save">Save</button></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row bottom">
      <div class="col-lg-12">
        <h3 class="text-center">Saved Locations</h3>
        <div class="panel panel-info">
          <div class="panel-heading">Panel heading without title</div>
          <div class="panel-body">
            <table class="table table-striped">
            <thead>
              <tr>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="savedLocation in savedLocations">
                <td>{{ savedLocation.address }}</td>
                <td>{{ savedLocation.lat }}</td>
                <td>{{ savedLocation.lng }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        welcome: "Hello from Vue!",
        foundLocations: [],
        savedLocations: [],
        address: ''
      }
    },
    mounted(){
      $.ajax({
        url: "/index",
      }).done(function(data){
        this.savedLocations = data
      }.bind(this));
    },
    methods: {
      search: function(){

        $.ajax({
          url: "/search",
          data: {
            address: this.address
          }
        }).done(function(data){
          var _this = this;
          _this.clearFoundLocations();
          data.forEach(function(el){
            _this.addFoundLocation(el);
          });
        }.bind(this));
      },
      addFoundLocation(location){
        location["id"] = this.foundLocations.length
        this.foundLocations.push(location)
      },
      clearFoundLocations(){
        this.foundLocations = []
      },
      save(index){
        var location = this.foundLocations.filter(function(e){ return e.id == index })[0]
        var _this = this;
        $.ajax({
          url: "/create",
          data: location,
          dataType: "json",
          method: "post",
          complete: function(data, xhr){
            if(data.status == 201){
              this.addSavedLocation(location)
            }else {
              // Display error message
            }
          }.bind(this)
        });
      },
      addSavedLocation(location){
        this.savedLocations.push(location)
      }
    }
  }
</script>

<style scoped>
.jumbotron{
  border-radius:0px!important;
  box-shadow:1px 1px 4px rgba(0,0,0,0.6);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(https://static1.squarespace.com/static/548353e7e4b0883e5fe2d2f0/t/54b7015ee4b05e2e7fbb69a9/1419960947279/black-white-city_white_2.jpg?format=2500w);
  position: relative;
  height: 100%;
}
.jumbotron:after{
  opacity: 0.9;
}

.save.btn {
  border-radius:0px!important;
  box-shadow:1px 1px 4px rgba(0,0,0,0.4);
  /*padding:10px 40px;*/
}

</style>
