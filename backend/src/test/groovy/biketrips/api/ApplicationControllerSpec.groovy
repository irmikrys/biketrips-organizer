package biketrips.api

import biketrips.AbstractMvcSpec
import org.springframework.http.HttpStatus
import org.springframework.security.test.context.support.WithMockUser
import spock.lang.Shared
import spockmvc.RequestParams

class ApplicationControllerSpec extends AbstractMvcSpec {
  @Shared
  String token

  def  "user logging in"() {
    given:
    def credentials = [username: 'billgates', password: 'Billgates1']

    when:
    def res = post('/api/session', credentials)
    token = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'billgates'
    token != null
  }

  def "get non-existing application"() {

    when:
    def result = get('/api/applications/billgates',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create new Application"() {
    given:
    def request = [
      username  : 'billgates',
      email: 'bill@gates',
      isActive:'0',
      createDate:'2012-04-23'
    ]

    when:
    def result = post("/api/apply", request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "create new Application with wrong mail"() {
    given:
    def request = [
      username  : 'billgates',
      email: 'bill@g',
      isActive:'0',
      createDate:'2012-04-23'
    ]

    when:
    def result = post("/api/apply", request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create new Application with wrong username"() {
    given:
    def request = [
      username  : 'billy',
      email: 'bill@gates',
      isActive:'0',
      createDate:'2012-04-23'
    ]

    when:
    def result = post("/api/apply", request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create new Application with another user than the one logged in"() {
    given:
    def request = [
      username  : 'markzuckerberg',
      email: 'mark@zuckerberg',
      isActive:'0',
      createDate:'2012-04-23'
    ]

    when:
    def result = post("/api/apply", request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "create new Application with empty data"() {
    given:
    def request = [
      username  : '',
      email: 'bill@gates',
      isActive:'0',
      createDate:'2012-04-23'
    ]

    when:
    def result = post("/api/apply", request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "get application"() {

    when:
    def result = get('/api/applications/billgates',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "get application with wrong name"() {

    when:
    def result = get('/api/applications/billy',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  def "update application"() {

    def request = [
      username  : 'billgates',
      email: 'bill@gates',
      isActive:'1',
      createDate:'2012-04-23'
    ]
    when:
    def result = put('/api/applications/billgates',request, new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }

  def "delete application"() {

    when:
    def result = delete('/api/applications/billgates',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.OK
  }


  def "delete non-existing application"() {

    when:
    def result = delete('/api/applications/billgates',new RequestParams(authToken: token))

    then:
    result.status == HttpStatus.BAD_REQUEST
  }

  @WithMockUser
  def "get all applications"() {

    when:
    def result = get('/api/applications')

    then:
    result.status == HttpStatus.OK
    result.json.size == 2
  }

  @WithMockUser
  def "get all active applications"() {

    when:
    def result = get('/api/activeApplications')

    then:
    result.status == HttpStatus.OK
    result.json.size == 1
  }
}
