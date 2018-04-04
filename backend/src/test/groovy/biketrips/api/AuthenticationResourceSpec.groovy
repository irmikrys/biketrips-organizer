package biketrips.api

import org.springframework.http.HttpStatus
import biketrips.AbstractMvcSpec
import spock.lang.Shared
import spock.lang.Stepwise
import spockmvc.RequestParams

@Stepwise
class AuthenticationResourceSpec extends AbstractMvcSpec {

  @Shared
  String token

  def "bad authentication"() {
    given:
    def credentials = [username: 'admin', password: 'badpassword']

    when:
    def res = post('/api/session', credentials)

    then:
    res.status == HttpStatus.UNAUTHORIZED
  }

  def "good authentication"() {
    given:
    def credentials = [username: 'admin', password: 'Admin123']

    when:
    def res = post('/api/session', credentials)
    token = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'admin'
    token != null
  }

  def "get session"() {
    when:
    def res = get('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK
    res.json.username == 'admin'
  }

  def "delete session"() {
    when:
    def res = delete('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK

    when:
    res = get('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK
    res.content.isEmpty()
  }
}
