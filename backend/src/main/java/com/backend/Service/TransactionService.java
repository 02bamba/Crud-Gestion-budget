package com.backend.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.backend.Model.Transaction;
import com.backend.Repository.TransactionRepo;;;

@Service
public class TransactionService {
    private final TransactionRepo transactionRepository;

    public TransactionService(TransactionRepo transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(UUID id) {
        return transactionRepository.findById(id);
    }

    public Transaction updateTransaction(Transaction transaction) {
        if (transaction.getId() != null) {
            return transactionRepository.save(transaction);
        }else{
            return null;
        }
    }

    public void deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
    }

}
