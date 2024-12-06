package com.backend.Controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Model.Transaction;
import com.backend.Service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService TransactionService;

    public TransactionController(TransactionService TransactionService) {
        this.TransactionService = TransactionService;
    }

    @PostMapping("/")
    public Transaction creTransaction (@RequestBody Transaction Transaction) {
        return TransactionService.createTransaction(Transaction);
    }

    @GetMapping("/")
    public List <Transaction> geTransactions() {
        return TransactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public Optional<Transaction> geTransactionById(@PathVariable("id") UUID id) {
        return TransactionService.getTransactionById(id);
    }

    @PutMapping("/{id}")
    public Transaction upTransaction(@PathVariable("id") UUID id, @RequestBody Transaction Transaction) {
        return TransactionService.updateTransaction(Transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction (@PathVariable("id") UUID id) {
        TransactionService.deleteTransaction(id);
    }
}
