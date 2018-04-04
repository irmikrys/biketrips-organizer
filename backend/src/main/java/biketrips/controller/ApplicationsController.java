package biketrips.controller;

import biketrips.dto.ApplicationDTO;
import biketrips.exceptions.ApplicationException;
import biketrips.model.Application;
import biketrips.model.User;
import biketrips.service.ApplicationsService;
import biketrips.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
public class ApplicationsController {

  @Autowired
  private ApplicationsService applicationsService;

  @Autowired
  @Qualifier("userService")
  private UserService userService;

  @RequestMapping(method = POST, path = "/api/apply")
  public @ResponseBody
  ResponseEntity<Application> createApplication(@Valid @RequestBody ApplicationDTO applicationDTO)
    throws ApplicationException {
    this.applicationsService.findByUsername(applicationDTO.getUsername()).ifPresent(
      application -> {
        throw new ApplicationException("application.error.usernameExists");
      });
    this.applicationsService.findByEmail(applicationDTO.getEmail()).ifPresent(
      application -> {
        throw new ApplicationException("application.error.emailExists");
      });
    User appliantName = this.userService.findByUsername(applicationDTO.getUsername()).orElseThrow(
      () -> new ApplicationException("application.error.userNotFound"));
    User appliantMail = this.userService.findByEmail(applicationDTO.getEmail()).orElseThrow(
      () -> new ApplicationException("application.error.emailNotFound"));
    Application application = applicationsService.createApplication(applicationDTO);
    return ResponseEntity.ok(application);
  }

  @RequestMapping(method = GET, path = "/api/applications")
  public @ResponseBody
  Iterable<Application> getAllApplications() {
    return applicationsService.findAll();
  }

  @RequestMapping(method = GET, path = "/api/applications/{username}")
  public @ResponseBody
  ResponseEntity<ApplicationDTO> getApplication(@PathVariable("username") String username) {
    Application application = this.applicationsService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.applicationNotFound"));
    User appliant = this.userService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.userNotFound"));
    ApplicationDTO applicationDTO = new ApplicationDTO(application);
    return ResponseEntity.ok(applicationDTO);
  }

  @RequestMapping(method = DELETE, path = "/api/applications/{username}")
  public @ResponseBody
  ResponseEntity<HttpStatus> deleteApplication(@PathVariable("username") String username) {
    Application application = this.applicationsService.findByUsername(username).orElseThrow(
      () -> new ApplicationException("getApplication.error.applicationNotFound"));
    this.applicationsService.deleteApplication(application.getUsername());
    return ResponseEntity.ok(HttpStatus.OK);
  }

}
