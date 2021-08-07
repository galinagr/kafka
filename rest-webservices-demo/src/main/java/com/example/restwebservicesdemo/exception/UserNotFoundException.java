package com.example.restwebservicesdemo.exception;

import java.util.Date;

public class UserNotFoundException extends Throwable {
    private String message;
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserNotFoundException(String message, int id) {
        this.message = message;
        this.id = id;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "UserNotFoundException{" +
                "message='" + message + '\'' +
                ", id=" + id +
                '}';
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
