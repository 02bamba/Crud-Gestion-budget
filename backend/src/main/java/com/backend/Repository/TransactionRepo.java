package com.backend.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.Model.Transaction;

public interface TransactionRepo  extends JpaRepository<Transaction, UUID> {
    
    Optional findById(UUID id);
}
