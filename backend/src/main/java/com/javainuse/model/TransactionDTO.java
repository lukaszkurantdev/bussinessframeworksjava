package main.java.com.javainuse.model;

import java.util.Date;

public class TransactionDTO {
    private long id;
    private String description;
    private double value;
    private Date date;
    private long accountId;
    private long categoryId;
    private long accountToId;
    private String type;

    public TransactionDTO() {
    }

    public TransactionDTO(long id, String description, double value, Date date, long accountId, long categoryId, long accountToId, String type) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.date = date;
        this.accountId = accountId;
        this.categoryId = categoryId;
        this.accountToId = accountToId;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public long getAccountToId() {
        return accountToId;
    }

    public void setAccountToId(long accountToId) {
        this.accountToId = accountToId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
