package com.ultimatedigitallabs.controller;

import com.ultimatedigitallabs.dto.AdminCreateRequest;
import com.ultimatedigitallabs.model.Admin;
import com.ultimatedigitallabs.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admins")
@CrossOrigin()
public class AdminController {
    private final AdminService service;

    @GetMapping()
    public ResponseEntity<List<Admin>> getAll(){
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Boolean> isUserExist(@PathVariable String email) throws Exception {
            return new ResponseEntity<>(service.isUserExist(email), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Admin> create(@RequestBody AdminCreateRequest request) throws Exception {
        return new ResponseEntity<>(service.createAdmin(request), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Admin> update(@RequestBody Admin admin) throws Exception {
        return new ResponseEntity<>(service.updateAdmin(admin), HttpStatus.OK);
    }

    @DeleteMapping("/{adminId}")
    public ResponseEntity<String> delete(@PathVariable int adminId) throws Exception {
        return new ResponseEntity<>(service.deleteAdmin(adminId), HttpStatus.OK);
    }
}
