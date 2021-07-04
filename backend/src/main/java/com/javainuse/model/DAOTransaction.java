package main.java.com.javainuse.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transaction")
public class DAOTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(
            name = "user_report_fk",
            foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT)
    )
    private DAOUser user;

    @Column
    private String description;

    @Column
    private double value;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @ManyToOne
    @JoinColumn(
            name = "account_transaction_fk",
            foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT)
    )
    private DAOAccount account;

    @ManyToOne
    @JoinColumn(
            name = "category_transaction_fk",
            foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT)
    )
    private DAOCategory category;

    @ManyToOne
    @JoinColumn(
            name = "account_to_transaction_fk",
            foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT)
    )
    private DAOAccount accountTo;

    @Column
    private String type;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public DAOUser getUser() {
        return user;
    }

    public void setUser(DAOUser user) {
        this.user = user;
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

    public DAOAccount getAccount() {
        return account;
    }

    public void setAccount(DAOAccount account) {
        this.account = account;
    }

    public DAOCategory getCategory() {
        return category;
    }

    public void setCategory(DAOCategory category) {
        this.category = category;
    }

    public DAOAccount getAccountTo() {
        return accountTo;
    }

    public void setAccountTo(DAOAccount accountTo) {
        this.accountTo = accountTo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}


