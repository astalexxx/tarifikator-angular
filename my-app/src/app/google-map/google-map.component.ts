import { Component, OnInit } from '@angular/core';
import { GetGeoService } from "../get-geo.service";
import { HttpClient } from '@angular/common/http';

declare let google: any;
declare let map: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  private map1:any;

  constructor(private svc: GetGeoService, private http: HttpClient) { }

  ngOnInit() {
    google.maps.event.addDomListener(window, "load", this.initMap());
  }
  private initMap(){
    var centerLatLng = new google.maps.LatLng(0, 0);
    var mapOptions = {
      center: centerLatLng,
      zoom: 2
    };
    this.map1 = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.init();
  }

  private init(){
    this.http.get('assets/sample.json').subscribe((result:any[])=>{
      var data = [],
          dataCollection = [];
      for (var i = 0; i < result.length; i++){
        data.push({
          ip: result[i][0],
          number: result[i][1],
          latitude: '',
          longitude: ''
        })
        if (data.length == 150){
          dataCollection.push(data);
          data = [];
        }
      };
      if (data.length > 0){
        dataCollection.push(data);
      }
      this.getCoordinates (dataCollection);
    });
  }

  private getCoordinates (jsondata){
    var counter = 0;
    this.ipRequest(counter, jsondata);
  }


  private timeout(counter, jsondata){
    setTimeout(() => {
      this.ipRequest(counter, jsondata);
    }, 60001);
  }

  private ipRequest(counter, jsondata){
    for (var i = 0; i < jsondata[counter].length; i++){
      let number = jsondata[counter][i].number;
      let ip = jsondata[counter][i].ip;
      var responses = 0;
      this.svc.getGeoData(jsondata[counter][i].ip).subscribe(data => {
         this.addMarker(data.lat, data.lon, number, ip);
         responses++;
         if (responses == jsondata[counter].length && counter != jsondata.length-1){
           counter++;
           this.timeout(counter, jsondata);
         }
       });
    }
  }

  private addMarker(lat, lon, number, ip){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: this.map1,
      title: "Requests: " + number + ', IP: ' + ip
    });
  }
}
