package biketrips;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration;

@SpringBootApplication(exclude = SessionAutoConfiguration.class)
public class BikeTripsManagerApplication {

  public static void main(String[] args) {
    SpringApplication.run(BikeTripsManagerApplication.class, args);
  }
}
