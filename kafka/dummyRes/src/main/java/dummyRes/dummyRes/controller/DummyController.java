package dummyRes.dummyRes.controller;

import dummyRes.dummyRes.service.DummyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DummyController {
    @Autowired
    DummyService dummyService;

    @PostMapping("/dummyapi")
    public StringBuilder checkMessage(@RequestBody String dummyMessage){
        return dummyService.dummyResponse(dummyMessage);
    }

}
