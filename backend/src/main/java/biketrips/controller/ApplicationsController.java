package biketrips.controller;

import biketrips.dto.ApplicationDTO;
import biketrips.dto.session.UserSession;
import biketrips.exceptions.ApplicationException;
import biketrips.model.Application;
import biketrips.model.User;
import biketrips.service.ApplicationService;
import biketrips.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
public class ApplicationsController {

  @Autowired
  private ApplicationService applicationService;

  @Autowired
  @Qualifier("userService")
  private UserService userService;

  @RequestMapping(method = POST, path = "/api/apply")
  public @ResponseBody
  ResponseEntity<Application> createApplication(@Valid @RequestBody ApplicationDTO applicationDTO, HttpSession session)
    throws ApplicationException {

    UserSession userSession = (UserSession) session.getAttribute("user");

    this.applicationService.findByUsername(applicationDTO.getUsername()).ifPresent(
      application -> {
        throw new ApplicationException("application.error.usernameExists");
      });
    this.applicationService.findByEmail(applicationDTO.getEmail()).ifPresent(
      application -> {
        throw new ApplicationException("application.error.emailExists");
      });

    User applicantByName = this.userService.findByUsername(applicationDTO.getUsername()).orElseThrow(
      () -> new ApplicationException("application.error.userNotFound"));
    User applicantByEmail = this.userService.findByEmail(applicationDTO.getEmail()).orElseThrow(
      () -> new ApplicationException("application.error.emailNotFound"));

    if(!userSession.getUsername().equals(applicantByName.getUsername())) {
      throw new ApplicationException("application.error.unauthorisedName");
    }

    if(!applicantByName.getUsername().equals(applicantByEmail.getUsername())) {
      throw new ApplicationException("application.error.unauthorisedEmail");
    }

    Application application = applicationService.createApplication(applicationDTO);
    return ResponseEntity.ok(application);
  }

  @RequestMapping(method = GET, path = "/api/applications")
  public @ResponseBody
  Iterable<Application> getAllApplications() {
    return applicationService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/applications/{username}")
  public @ResponseBody
  ResponseEntity<ApplicationDTO> getApplication(@PathVariable("username") String username) {
    Application application = this.applicationService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.applicationNotFound"));
    User appliant = this.userService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.userNotFound"));
    ApplicationDTO applicationDTO = new ApplicationDTO(application);
    return ResponseEntity.ok(applicationDTO);
  }

  @RequestMapping(method = DELETE, path = "/api/applications/{username}")
  public @ResponseBody
  ResponseEntity<HttpStatus> deleteApplication(@PathVariable("username") String username) {
    Application application = this.applicationService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.applicationNotFound"));
    this.applicationService.deleteApplication(application.getUsername());
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = PUT, path = "/api/applications/{username}")
  public @ResponseBody
  ResponseEntity<HttpStatus> updateApplication(
    @PathVariable("username") String username,
    @Valid @RequestBody ApplicationDTO applicationDTO
  ) {
    Application application = this.applicationService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.applicationNotFound"));
    this.applicationService.updateApplication(application, applicationDTO);
    return ResponseEntity.ok(HttpStatus.OK);
  }

  @RequestMapping(method = GET, path = "/api/activeApplications")
  public @ResponseBody
  Iterable<ApplicationDTO> getAllActiveApplications() {
    return applicationService.findAllActive();
  }

}
