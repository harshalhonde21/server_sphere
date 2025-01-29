package dummyRes.dummyRes.service;

import org.springframework.stereotype.Service;

@Service
public class DummyService {
    public StringBuilder dummyResponse(String message){
        StringBuilder revMessage = new StringBuilder(message);
        revMessage = revMessage.reverse(); // reversing the string over here
        return revMessage;

    }
}
