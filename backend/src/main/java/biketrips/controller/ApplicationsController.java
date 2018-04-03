package biketrips.controller;

import biketrips.dto.ApplicationDTO;
import biketrips.exceptions.ApplicationException;
import biketrips.model.Application;
import biketrips.service.ApplicationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


@RestController
public class ApplicationsController {

  @Autowired
  private ApplicationsService applicationsService;

  @RequestMapping(method = POST, path = "/api/apply")
  public @ResponseBody
  ResponseEntity<Application> createApplication(@Valid @RequestBody ApplicationDTO applicationDTO)
    throws ApplicationException {
    if (applicationsService.findByUsername(applicationDTO.getUsername()) != null) {
      throw new ApplicationException("application.error.usernameExists");
    }
    Application application = applicationsService.createApplication(applicationDTO);
    return ResponseEntity.ok(application);
  }

  @RequestMapping(method = GET, path = "/api/applications")
  public @ResponseBody
  Iterable<Application> getAllApplications() {
    return applicationsService.findAll();
  }
}
