package biketrips.api

import biketrips.AbstractMvcSpec
import org.springframework.http.HttpStatus
import spock.lang.Shared
import spock.lang.Stepwise
import spockmvc.RequestParams

@Stepwise
class TripControllerSpec extends AbstractMvcSpec {

  @Shared
  String token
  String token2

  def "user logging in"() {
    given:
    def credentials = [username: 'annacuk', password: 'Raz2trzy4']

    when:
    def res = post('/api/session', credentials)
    token = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'annacuk'
    token != null
  }

  def "second user logging in"() {
    given:
    def credentials = [username: 'billgates', password: 'Billgates1']

    when:
    def res = post('/api/session', credentials)
    token2 = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'billgates'
    token != null
  }

  def "create new trip with correct data"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '1',
      idStatus   : '1',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.idTrip == 2
    result.json.moderator == 'annacuk'
    result.json.name == 'wycieczka'
    result.json.idLevel == 1
    result.json.idStatus == 1
    result.json.description == 'opis jakis'
    result.json.points == 123

    when:
    def resultAfter = get('/api/trips', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 2
  }

  def "create new trip with non-existing idLevel"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '5',
      idStatus   : '1',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST

    when:
    def resultAfter = get('/api/trips', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 2
  }

  def "create new trip with non-existing idStatus"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '2',
      idStatus   : '8',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST

    when:
    def resultAfter = get('/api/trips', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 2
  }

  def "create new trip with empty field"() {
    given:
    def request = [
      moderator  : 'annacuk',
      startDate  : '2012-04-23T18:25:43.511Z', //fixme dates in json
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '2',
      idStatus   : '8',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST

    when:
    def resultAfter = get('/api/trips', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 2
  }

  def "create new trip with negative value"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '2',
      idStatus   : '1',
      description: 'opis jakis',
      points     : '-123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST

    when:
    def resultAfter = get('/api/trips', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 2
  }

  def "create new trip with too big value"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '2',
      idStatus   : '2',
      description: 'opis jakis',
      points     : '10000'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST

    when:
    def resultAfter = get('/api/trips', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 2
  }

  def "get all trips"() {
    when:
    def result = get('/api/trips', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 2
  }

  def "get all statuses"() {
    when:
    def result = get('/api/statuses', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 3
  }

  def "get all levels"() {
    when:
    def result = get('/api/levels', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 3
  }

  def "get trip with existing id"() {
    when:
    def result = get('/api/trips/1', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "get trip with non-existing id"() {
    when:
    def result = get('/api/trips/3', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "update trip with correct data"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka poprawiona',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '1',
      idStatus   : '2',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = put('/api/trips/2', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK

    when:
    def resultAfter = get('/api/trips/2', new RequestParams(authToken: token))

    then:
    resultAfter.json.moderator == 'annacuk'
    resultAfter.json.name == 'wycieczka poprawiona'
    resultAfter.json.idLevel == 1
    resultAfter.json.idStatus == 2
    resultAfter.json.description == 'opis jakis'
    resultAfter.json.points == 123
  }

  def "update not owned trip"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka poprawiona',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '1',
      idStatus   : '2',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = put('/api/trips/1', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "update non-existing trip"() {
    given:
    def request = [
      moderator  : 'annacuk',
      name       : 'wycieczka poprawiona',
      startDate  : '2012-04-23T18:25:43.511Z',
      endDate    : '2012-04-25T18:25:43.511Z',
      idLevel    : '1',
      idStatus   : '2',
      description: 'opis jakis',
      points     : '123'
    ]

    when:
    def result = put('/api/trips/4', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "get trips by moderator"() {
    when:
    def result = get('/api/moderator/trips', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 1
  }

  def "add participant"() {
    given:
    def request = [
      username  : 'billgates',
      idTrip    : '2',
      idActivity: '2'
    ]

    when:
    def result = post('/api/trips/2/participants', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.username == 'billgates'
    result.json.idActivity == 2
    result.json.idTrip == 2

    when:
    def resultAfter = get('/api/trips/2/participants', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 1
  }

  def "get trips by user"() {
    when:
    def result = get('/api/trips/billgates', new RequestParams(authToken: token2))

    then:
    result.status == HttpStatus.OK
    result.json.size == 1
  }

  def "add participant with non-existing idActivity"() {
    given:
    def request = [
      username  : 'billgates',
      idTrip    : '2',
      idActivity: '5'
    ]

    when:
    def result = post('/api/trips/2/participants', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "add non-existing participant"() {
    given:
    def request = [
      username  : 'billgat',
      idTrip    : '2',
      idActivity: '1'
    ]

    when:
    def result = post('/api/trips/2/participants', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "add participant to not owned trip"() {
    given:
    def request = [
      username  : 'billgates',
      idTrip    : '2',
      idActivity: '1'
    ]

    when:
    def result = post('/api/trips/3/participants', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "add participant that has already been added"() {
    given:
    def request = [
      username  : 'billgates',
      idTrip    : '2',
      idActivity: '1'
    ]

    when:
    def result = post('/api/trips/2/participants', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "add participant to non-existing trip"() {
    given:
    def request = [
      username  : 'billgates',
      idTrip    : '5',
      idActivity: '1'
    ]

    when:
    def result = post('/api/trips/5/participants', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "get trip's participants"() {
    when:
    def result = get('/api/trips/2/participants', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 1
  }

  def "get participants from non-existing trip"() {
    when:
    def result = get('/api/trips/5/participants', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "get participant by username"() {
    when:
    def result = get('/api/trips/2/participants/billgates', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.username == 'billgates'
    result.json.idTrip == 2
    result.json.idActivity == 2
  }

  def "get participant with incorrect username"() {
    when:
    def result = get('/api/trips/2/participants/stevejobs', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }


  def "add correct comment"() {
    given:
    def request = [
      idTrip : '2',
      content: 'komenatarz jakis tam'
    ]

    when:
    def result = post('/api/trips/2/comments', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.idComment == 1

    when:
    def resultAfter = get('/api/trips/2/comments', new RequestParams(authToken: token))

    then:
    resultAfter.json.size == 1
  }

  def "add empty comment"() {
    given:
    def request = [
      idTrip : '2',
      content: ''
    ]

    when:
    def result = post('/api/trips/2/comments', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "add comment to non-existing trip"() {
    given:
    def request = [
      idTrip : '5',
      content: ''
    ]

    when:
    def result = post('/api/trips/5/comments', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "add comment to wrong trip"() {
    given:
    def request = [
      idTrip : '1',
      content: ''
    ]

    when:
    def result = post('/api/trips/2/comments', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "get trip's comments"() {
    when:
    def result = get('/api/trips/2/comments', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 1
  }

  def "delete non-existing comment"() {
    when:
    def result = delete('/api/trips/2/comments/3', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "delete Trip's all comments"() {
    when:
    def result = delete('/api/trips/2/comments', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "delete all comments from non-existing trip"() {
    when:
    def result = delete('/api/trips/5/comments', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "delete participant by username"() {
    when:
    def result = delete('/api/trips/2/participants/billgates', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "delete participant from not owned trip"() {
    when:
    def result = delete('/api/trips/1/participants/billgates', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "delete participant from non-existing trip"() {
    when:
    def result = delete('/api/trips/5/participants/billgates', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "delete participant with incorrect username"() {
    when:
    def result = delete('/api/trips/2/participants/stevejobs', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }
//TODO EPISODES,Trips by user, updating and deleting comments (+with participants), albums

}
