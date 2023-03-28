package com.ultimatedigitallabsactorms.proxy;

import com.ultimatedigitallabsactorms.models.MovieResponseModel;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name="movies-ms")
public interface MovieProxy {
    String movie="/api/v1/movies";

    @GetMapping(value = movie+"/{id}")
    MovieResponseModel getById(@PathVariable int id);

    @GetMapping(value = movie +"/byactorid/{actorId}")
    List<MovieResponseModel> getMoviesByActorId(@PathVariable int actorId, @RequestHeader(HttpHeaders.AUTHORIZATION) String headers);
}
