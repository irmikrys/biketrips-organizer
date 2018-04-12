package biketrips

import org.springframework.boot.test.context.SpringBootTest
import org.springframework.session.MapSessionRepository
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import org.springframework.session.web.http.SessionRepositoryFilter
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Shared
import spockmvc.SpockMvcSpec

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity

//before launching, make sure that the schema and imports are already created

@SpringBootTest
@ContextConfiguration(classes = [BikeTripsManagerApplication])
@ActiveProfiles("test")
abstract class AbstractMvcSpec extends SpockMvcSpec {

  @Shared
  private def sessionRepository = new MapSessionRepository()

  @Override
  MockMvc buildMockMvc(WebApplicationContext webApplicationContext) {
    def sessionFilter = new SessionRepositoryFilter(sessionRepository)
    sessionFilter.httpSessionStrategy = new HeaderHttpSessionStrategy()

    MockMvcBuilders
      .webAppContextSetup(webApplicationContext)
      .apply(springSecurity())
      .addFilter(sessionFilter)
      .build()
  }
}
