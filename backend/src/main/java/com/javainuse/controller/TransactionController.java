package main.java.com.javainuse.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import main.java.com.javainuse.dao.AccountDao;
import main.java.com.javainuse.dao.CategoryDao;
import main.java.com.javainuse.dao.TransactionDao;
import main.java.com.javainuse.dao.UserDao;
import main.java.com.javainuse.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class TransactionController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private TransactionDao transactionDao;

    @RequestMapping({ "/transactions" })
    public ResponseEntity<?> getCategories(@RequestParam("startDate") String startDateString, @RequestParam("endDate") String endDateString, Principal principal) throws Exception {
        DAOUser user = userDao.findByUsername(principal.getName());


        Date startDate = java.sql.Date.valueOf(LocalDate.parse(startDateString));
        Date endDate = java.sql.Date.valueOf(LocalDate.parse(endDateString));

        List<DAOTransaction> transactions = transactionDao.findAllByUser(user);

        transactions = transactions.stream()
                .filter(obj -> obj.getDate() != null && obj.getDate().after(startDate) && obj.getDate().before(endDate))
                .collect(Collectors.toList());

        return ResponseEntity.ok(transactions);
    }

    @RequestMapping(value = "/transactions", method = RequestMethod.POST)
    public ResponseEntity<?> saveTransaction(@RequestBody TransactionDTO transaction, Principal principal) throws Exception {
        DAOUser user = userDao.findByUsername(principal.getName());
        DAOCategory category = categoryDao.findById(transaction.getCategoryId());
        DAOAccount account = accountDao.findById(transaction.getAccountId());
        DAOAccount accountTo = accountDao.findById(transaction.getAccountToId());

        if (user == null) {
            throw new Exception("User not found");
        }

        DAOTransaction newTransaction = new DAOTransaction();
        newTransaction.setType(transaction.getType());

        if(transaction.getType().equals("income") || transaction.getType().equals("expense")) {
            if(account == null) {
                throw new Exception("Account not found");
            }
            if(category == null) {
                throw new Exception("Category not found");
            }

            newTransaction.setUser(user);
            newTransaction.setAccount(account);
            newTransaction.setCategory(category);
            newTransaction.setDate(transaction.getDate());
            newTransaction.setValue(transaction.getValue());

            if(transaction.getType().equals("income")) {
                account.setBalance(account.getBalance() + transaction.getValue());
            } else {
                account.setBalance(account.getBalance() - transaction.getValue());
            }

            accountDao.save(account);
            transactionDao.save(newTransaction);
        } else if(transaction.getType().equals("transfer")) {
            if(account == null || accountTo == null) {
                throw new Exception("Account not found");
            }

            newTransaction.setUser(user);
            newTransaction.setAccount(account);
            newTransaction.setAccountTo(accountTo);
            newTransaction.setDate(transaction.getDate());
            newTransaction.setValue(transaction.getValue());

            account.setBalance(account.getBalance() - transaction.getValue());
            accountTo.setBalance(accountTo.getBalance() + transaction.getValue());

            accountDao.save(account);
            accountDao.save(accountTo);
            transactionDao.save(newTransaction);
        } else {
            throw new Exception("Unknown transaction type");
        }

        return ResponseEntity.ok(newTransaction);
    }

    @RequestMapping(value = "/transactions", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTransaction(@RequestBody TransactionDTO transaction, Principal principal) throws Exception {

        DAOUser user = userDao.findByUsername(principal.getName());
        DAOTransaction transactionToDelete = transactionDao.findById(transaction.getId());

        if(transactionToDelete.getUser() != user) {
            throw new Exception("No permissions");
        }

        if(transactionToDelete.getType().equals("income")  || transactionToDelete.getType().equals("expense")) {
            DAOAccount account = transactionToDelete.getAccount();

            if(transaction.getType() == "income") {
                account.setBalance(account.getBalance() - transaction.getValue());
            } else {
                account.setBalance(account.getBalance() + transaction.getValue());
            }
            accountDao.save(account);
        } else {
            DAOAccount account = transactionToDelete.getAccount();
            DAOAccount accountTo = transactionToDelete.getAccountTo();
            account.setBalance(account.getBalance() + transaction.getValue());
            accountTo.setBalance(accountTo.getBalance() - transaction.getValue());
            accountDao.save(accountTo);
            accountDao.save(account);
        }

        transactionDao.delete(transactionToDelete);
        return ResponseEntity.ok(transactionToDelete);
    }
}