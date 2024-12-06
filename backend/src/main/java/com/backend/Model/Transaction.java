package com.backend.Model;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Transaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String description;
    private Type type;
    private double amount;
    private Date date;
    private enum Type {
        RENENUE, DEPENSE
    }
    //constructeur
    public Transaction(UUID id, String description, Type type, double amount, Date date) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }
    public Transaction() {
    }
    // getters et setters
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Type getType() {
        return type;
    }
    public void setType(Type type) {
        this.type = type;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    //toString methode
    @Override
    public String toString() {
        return "Transaction [id=" + id + ", description=" + description + ", type=" + type + ", amount=" + amount
                + ", date=" + date + "]";
    }
    
}
