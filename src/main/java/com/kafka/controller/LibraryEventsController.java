package com.kafka.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kafka.domain.LibraryEvent;
import com.kafka.domain.LibraryEventType;
import com.kafka.producer.LibraryEventProducer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.support.SendResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

@RestController
@Slf4j
public class LibraryEventsController {

    @Autowired
    LibraryEventProducer libraryEventProducer;

    @PostMapping("/v1/libraryevent")
    public ResponseEntity<LibraryEvent> postLibraryEvent(@RequestBody LibraryEvent libraryEvent) throws JsonProcessingException, ExecutionException, InterruptedException, TimeoutException {

        //invoke kafka producer
        log.info("Before library event");
//        libraryEventProducer.sendLibraryEvent(libraryEvent);
        libraryEventProducer.sendLibraryEvent_approach2(libraryEvent);
        libraryEvent.setLibraryEventType(LibraryEventType.NEW);
//        SendResult<Integer, String >  sendResult = libraryEventProducer.sendLibraryEventSynchronous((libraryEvent));
//        log.info("Send result is {}", sendResult.toString());
        log.info("After library event");
        return ResponseEntity.status(HttpStatus.CREATED).body(libraryEvent);
    }
}
