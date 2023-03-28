package com.ultimatedigitallabs.exception;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ErrorMessage {
    private int status;
    private String message;
    private long timeStamp;
}
