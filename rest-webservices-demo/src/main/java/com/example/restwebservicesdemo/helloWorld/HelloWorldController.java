package com.example.restwebservicesdemo.helloWorld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping("/")
public class HelloWorldController {
    @Autowired
    private MessageSource messageSource;

    @GetMapping( path="/hello-world")
    public String helloWorld(){
        return "Hello World!";
    }

    @GetMapping(path="/hello-bean")
    public HelloBean helloBean(){
        return new HelloBean("Hello Bean!");
    }

    @GetMapping(path="/hello-bean__variable/{name}")
    public HelloBean helloBeanVars(@PathVariable String name){
        return new HelloBean(String .format("Hello Bean, %s", name));
    }

    @GetMapping(path="/hello-bean__internationalized")
    public String helloBeanInternationalized(@RequestHeader(name="Accept-Language", required = false) Locale locale){
        return messageSource.getMessage("good.morning.message", null, LocaleContextHolder.getLocale());
    }
}