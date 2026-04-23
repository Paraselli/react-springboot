package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    // Get all users
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // Add new user
    public User addUser(User user) {
        return repo.save(user);
    }

    // Delete user by id
    public void deleteUser(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        repo.deleteById(id);
    }
}
