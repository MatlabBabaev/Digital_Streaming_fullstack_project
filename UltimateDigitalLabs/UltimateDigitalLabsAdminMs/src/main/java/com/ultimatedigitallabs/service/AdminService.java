package com.ultimatedigitallabs.service;

import com.ultimatedigitallabs.dto.AdminCreateRequest;
import com.ultimatedigitallabs.model.Admin;
import com.ultimatedigitallabs.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository repository;
    private final PasswordEncoder encoder;

    public List<Admin> getAll(){
        return repository.findAll();
    }

    public Boolean isUserExist(String email) throws Exception {
        return repository.findAdminByEmail(email).isPresent();
    }

    public Admin createAdmin(AdminCreateRequest request) throws Exception {
        if(isUserExist(request.getEmail())){
            throw new Exception("User email already exist!");
        }
        Admin admin = Admin.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();

        return repository.save(admin);
    }

    public String deleteAdmin(int id) throws Exception {

        Admin admin = repository.findById(id).orElseThrow(() -> new Exception("admin not found"));
        repository.delete(admin);
        return "Admin deleted successfully!";
    }

    public Admin updateAdmin (Admin admin) throws Exception {
        repository.findById(admin.getAdminId()).orElseThrow(() -> new Exception("admin not found"));
        admin.setPassword(encoder.encode(admin.getPassword()));
        return repository.save(admin);
    }
}
