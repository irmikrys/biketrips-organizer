package biketrips.exception_handlers;

import biketrips.controller.TripController;
import biketrips.dto.ErrorMessage;
import biketrips.exceptions.AccessingPrivateResourcesException;
import biketrips.exceptions.TripException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice(assignableTypes = TripController.class)
public class TripControllerExceptionHandler {
  private final Log log = LogFactory.getLog(getClass());

  @ExceptionHandler(TripException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorMessage handleCreationException(TripException e) {
    log.warn(e.getMessage());
    return new ErrorMessage(e.getMessage());
  }

  @ExceptionHandler(AccessingPrivateResourcesException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ErrorMessage handleAccessingPrivateResourcesException(AccessingPrivateResourcesException e) {
    log.warn(e.getMessage());
    return new ErrorMessage(e.getMessage());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorMessage handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    log.warn(e.getMessage());
    return new ErrorMessage("trip.error.badRequest");
  }

  @ExceptionHandler(Exception.class)
  @ResponseBody
  public ErrorMessage handleUnknownException(Exception e) {
    return new ErrorMessage("tripService.error.unknownError");
  }

}
