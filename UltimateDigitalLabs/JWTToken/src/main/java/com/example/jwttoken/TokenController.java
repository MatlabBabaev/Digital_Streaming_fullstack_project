package com.example.jwttoken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class TokenController {

	@GetMapping("/token")
	public ResponseEntity<String> getOrders(@RegisteredOAuth2AuthorizedClient("admin-oidc") OAuth2AuthorizedClient authorizedClient) {

		String jwtAccessToken = authorizedClient.getAccessToken().getTokenValue();
		System.out.println("jwtAccessToken =  " + jwtAccessToken);
		return new ResponseEntity<>(jwtAccessToken, HttpStatus.OK);
	}

	@GetMapping("/test")
	public ResponseEntity<String> getToken(){
		System.out.println("Calling my endpoint now");
		return new ResponseEntity<>("My token", HttpStatus.OK);
	}
}
