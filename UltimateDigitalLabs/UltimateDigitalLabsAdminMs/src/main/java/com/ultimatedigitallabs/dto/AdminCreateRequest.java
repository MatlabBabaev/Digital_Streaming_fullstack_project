package com.ultimatedigitallabs.dto;

import lombok.Data;

@Data
public class AdminCreateRequest {

    private String fullName;
    private String email;
    private String password;
}
