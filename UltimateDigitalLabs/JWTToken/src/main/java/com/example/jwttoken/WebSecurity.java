package com.example.jwttoken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
public class WebSecurity {

    @Autowired
    private CORSCustomizer corsCustomizer;

    @Bean
    SecurityFilterChain configureSecurityFilterChain(HttpSecurity http) throws Exception{
        corsCustomizer.corsCustomizer(http);
        http.csrf().disable();
        http.authorizeHttpRequests().anyRequest().permitAll().and()
                .httpBasic(withDefaults());

        return http.build();
    }
}
