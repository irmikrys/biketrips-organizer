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
  def "user logged in"(){
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

  def "create new trip with correct data"() {
    given:
    def request = [
      moderator: 'annacuk',
      name: 'wycieczka',
      startDate: '2012-04-23T18:25:43.511Z',
      endDate: '2012-04-25T18:25:43.511Z',
      idLevel: '1',
      idStatus: '1',
      description: 'opis jakis',
      points: '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.moderator =='annacuk'
    result.json.name == 'wycieczka'
    result.json.idLevel == 1
    result.json.idStatus == 1
    result.json.description == 'opis jakis'
    result.json.points == 123
  }

  def "create new trip with not existing idLevel"() {
    given:
    def request = [
      moderator: 'billgates',
      name: 'wycieczka',
      startDate: '2012-04-23T18:25:43.511Z',
      endDate: '2012-04-25T18:25:43.511Z',
      idLevel: '5',
      idStatus: '1',
      description: 'opis jakis',
      points: '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create new trip with not existing idStatus"() {
    given:
    def request = [
      moderator: 'billgates',
      name: 'wycieczka',
      startDate: '2012-04-23T18:25:43.511Z',
      endDate: '2012-04-25T18:25:43.511Z',
      idLevel: '2',
      idStatus: '8',
      description: 'opis jakis',
      points: '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create new trip with empty field"() {
    given:
    def request = [
      moderator: 'billgates',
      startDate: '2012-04-23T18:25:43.511Z', //fixme dates in json
      endDate: '2012-04-25T18:25:43.511Z',
      idLevel: '2',
      idStatus: '8',
      description: 'opis jakis',
      points: '123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }
  def "create new trip with negative value"() {
    given:
    def request = [
      moderator: 'billgates',
      name: 'wycieczka',
      startDate: '2012-04-23T18:25:43.511Z',
      endDate: '2012-04-25T18:25:43.511Z',
      idLevel: '2',
      idStatus: '8',
      description: 'opis jakis',
      points: '-123'
    ]

    when:
    def result = post('/api/trips', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "See all trips"() {
    when:
    def result = get('/api/trips', new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 1
  }

  def "Get all statuses"() {
    when:
    def result = get('/api/statuses',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 3
  }

  def "Get all levels"() {
    when:
    def result = get('/api/levels',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
    result.json.size == 3
  }

  def "See trip with existing id"() {
    when:
    def result = get('/api/trips/1',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "See trip with not existing id"() {
    when:
    def result = get('/api/trips/3',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }
}
