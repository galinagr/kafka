package com.kafka.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Book {

    @NotNull(message = "Null is not allowed")
    Integer bookId;
    @NotBlank
    String bookName;
    @NotBlank
    String bookAuthor;
}
