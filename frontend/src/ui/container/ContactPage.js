import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ADDRESS} from "../constants/constants";

export class ContactPage extends Component {

  componentDidMount() {
    const latitude = 50.0645191000000000;
    const longitude = 19.923639699999967;
    const description = 'aleja Adama Mickiewicza 30, Kraków, Polska';
    let map = new window.google.maps.Map(document.getElementById('map-contact'), {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 12,
      mapTypeId: 'roadmap',
    });
    new window.google.maps.Marker({
      map: map,
      position: {
        lat: latitude,
        lng: longitude
      },
      title: description,
      zIndex: 1
    });
  }

  renderText = text => {
    return (
      text.split("\n").map(i => {
        return <p>{i}</p>;
      }))
  };

  render() {
    return (
      <div className="main">
        <div className="left-content contact-page">
          <div className="paragraph-title">
            <h2>Contact</h2>
          </div>
          <div className="paragraph">
            <div className="column">
              <div id="map-contact"/>
            </div>
          </div>
          <div className="paragraph">
            <div className="column">
              <div className="information">To contact us, please e-mail <a
                href="mailto:biketrips.admin@gmail.com">
                biketrips.admin@gmail.com
              </a>
              </div>
              <div>
                <div className="information">
                  <p><b>You can also write to:</b></p>
                  <p className="bold">
                    {this.renderText(ADDRESS)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(

)(ContactPage);
