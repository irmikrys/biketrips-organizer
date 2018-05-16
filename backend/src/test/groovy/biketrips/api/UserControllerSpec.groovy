package biketrips.api

import biketrips.AbstractMvcSpec
import org.springframework.http.HttpStatus
import org.springframework.security.test.context.support.WithMockUser
import spock.lang.Stepwise
import spock.lang.Shared
import spockmvc.RequestParams

@Stepwise
class UserControllerSpec extends AbstractMvcSpec {
  @Shared
  String token
  String token2

  def "create account with correct data"() {
    given:
    def request = [
      username: 'dennisritchie',
      password: 'TWkJb8ZB',
      email: 'dennisritchie@test.com',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = post('/api/register', request)

    then:
    result.status == HttpStatus.OK
  }

  def "create account with username that already exists"() {
    given:
    def request = [
      username: 'billgates',
      password: 'TWkJb8ZB',
      email: 'dennisritchietest@test.com',
      firstName: 'Dennis',
      lastName: 'Ritchie'
    ]

    when:
    def result = post('/api/register', request)

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create account with email that already exists"() {
    given:
    def request = [
      username: 'dennisritchiee',
      password: 'TWkJb8ZB',
      email: 'bill@gates',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = post('/api/register', request)

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "user logging in"() {
    given:
    def credentials = [username: 'dennisritchie', password: 'TWkJb8ZB']

    when:
    def res = post('/api/session', credentials)
    token = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'dennisritchie'
    token != null
  }

  def "moder logging in"() {
    given:
    def credentials = [username: 'annacuk', password: 'Raz2trzy4']

    when:
    def res = post('/api/session', credentials)
    token2 = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'annacuk'
    token2 != null
  }
  def "update account with correct data"() {
    given:
    def request = [
      username: 'dennisritchie',
      password: 'TWkJb8ZB',
      email: 'dennisrit@test.com',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = put('/api/users/dennisritchie', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "update account with wrong password"() {
    given:
    def request = [
      username: 'dennisritchie',
      password: '123',
      email: 'dennisrit@test.com',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = put('/api/users/dennisritchie', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "update account with already used mail"() {
    given:
    def request = [
      username: 'dennisritchie',
      password: 'TWkJb8ZB',
      email: 'steve@jobs',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = put('/api/users/dennisritchie', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "update non-existing account"() {
    given:
    def request = [
      username: 'dennisritchie',
      password: 'TWkJb8ZB',
      email: 'dennisritchie@test.com',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = put('/api/users/dennisr', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "update non-updatable data"() {
    given:
    def request = [
      username: 'dennis',
      password: 'TWkJb8ZB',
      email: 'dennisritchie@test.com',
      firstName: 'Dennis',
      lastName: 'Ritchie',
      role: 'USER'
    ]

    when:
    def result = put('/api/users/dennisritchie', request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  @WithMockUser
  def "get list of all users"() {

    when:
    def result = get('/api/users')

    then:
    result.status == HttpStatus.OK
    result.json.size == 6

  }

  @WithMockUser
  def "get information about user"() {

    when:
    def result = get('/api/users/billgates')

    then:
    result.status == HttpStatus.OK
    result.json.user.username == "billgates"
    result.json.user.email == "bill@gates"
    result.json.user.firstName == "Bill"
    result.json.user.lastName == "Gates"
    result.json.user.role == "USER"
    result.json.user.photo == null
    result.json.user.points == 0

  }

}
