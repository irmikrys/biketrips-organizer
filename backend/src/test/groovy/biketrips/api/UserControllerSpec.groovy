package biketrips.api

import biketrips.AbstractMvcSpec
import org.springframework.http.HttpStatus
import org.springframework.security.test.context.support.WithMockUser
import spock.lang.Stepwise

@Stepwise
class UserControllerSpec extends AbstractMvcSpec {

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

  @WithMockUser
  def "get list of all users"() {

    when:
    def result = get('/api/users')

    then:
    result.status == HttpStatus.OK
    result.json.size == 5

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
