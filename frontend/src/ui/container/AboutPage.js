import React, {Component} from 'react';
import {connect} from 'react-redux';

export class AboutPage extends Component {

  render() {
    return (
      <div className="main">
        <div className="left-content contact-page">
          <div className="paragraph-title">
            <h2>About service</h2>
          </div>
          <div className="paragraph">
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"/>
                <li data-target="#myCarousel" data-slide-to="1"/>
                <li data-target="#myCarousel" data-slide-to="2"/>
                <li data-target="#myCarousel" data-slide-to="3"/>
                <li data-target="#myCarousel" data-slide-to="4"/>
                <li data-target="#myCarousel" data-slide-to="5"/>
                <li data-target="#myCarousel" data-slide-to="6"/>
              </ol>

              <div className="carousel-inner">
                <div className="item active">
                  <img src='https://image.ibb.co/fPEKVd/trip_view.png' alt="Trip_view" className='styled'/>
                    <div className="carousel-caption caption">
                      <h3>Trip view</h3>
                      <p>See trips details!</p>
                    </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/g4NjwJ/comments.png' alt="Comments" className='styled'/>
                    <div className="carousel-caption caption">
                      <h3>Comments</h3>
                      <p>Comment your trips!</p>
                    </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/fjBYqd/photos.png' alt="Add_photos" className='styled'/>
                  <div className="carousel-caption caption">
                    <h3>Photos</h3>
                    <p>Add and view trip photos!</p>
                  </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/h7YPwJ/apply.png' alt="Apply" className='styled'/>
                    <div className="carousel-caption caption">
                      <h3>Applications</h3>
                      <p>Apply for moderator and create your own trips!</p>
                    </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/fB3eVd/create_trip.png' alt="Create_trip" className='styled'/>
                  <div className="carousel-caption caption">
                    <h3>Creation</h3>
                    <p>Create your trip!</p>
                  </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/hWnv3y/participants.png' alt="Participants" className='styled'/>
                  <div className="carousel-caption caption">
                    <h3>Participants</h3>
                    <p>Add participants to your trip!</p>
                  </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/ngnv3y/episodes.png' alt="Episodes" className='styled'/>
                  <div className="carousel-caption caption">
                    <h3>Episodes</h3>
                    <p>Add episodes to your trip!</p>
                  </div>
                </div>

                <div className="item">
                  <img src='https://image.ibb.co/mivhiy/created_trips.png' alt="Created" className='styled'/>
                  <div className="carousel-caption caption">
                    <h3>Created trips</h3>
                    <p>Review and edit your trips!</p>
                  </div>
                </div>

                <div className="item">
                  <img src='https://images.ctfassets.net/o6sr41tx16eu/2e1dtxhzXqMIyIk4MgOqoC/c2fdc8eaee070077ccbf4ac4a634a4b3/Multistrada-1200-Enduro-Pro-MY18-Sand-13-Slider-Gallery-1920x1080.jpg'
                       alt="More"
                       className='styled'
                  />
                  <div className="carousel-caption caption">
                    <h3>And many more!</h3>
                    <p>
                      Sign up or sign in to start using!
                      <span className='glyphicon glyphicon-fire'/>
                    </p>
                  </div>
                </div>
              </div>

              <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"/>
                <span className="sr-only">Previous</span>
              </a>
              <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"/>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
}

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AboutPage);
