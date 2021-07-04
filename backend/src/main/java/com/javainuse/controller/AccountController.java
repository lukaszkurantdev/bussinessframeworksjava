package main.java.com.javainuse.controller;

import java.security.Principal;
import java.util.List;

import main.java.com.javainuse.dao.AccountDao;
import main.java.com.javainuse.dao.UserDao;
import main.java.com.javainuse.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class AccountController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AccountDao accountDao;

    @RequestMapping({ "/accounts" })
    public ResponseEntity<?> getAccounts(Principal principal) throws Exception {
        DAOUser user = userDao.findByUsername(principal.getName());
        List<DAOAccount> accounts = accountDao.findAllByUser(user);
        return ResponseEntity.ok(accounts);
    }

    @Secured("ROLE_ADMIN")
    @RequestMapping({ "/all_users_accounts" })
    public ResponseEntity<?> getAllAccounts() throws Exception {
        List<DAOAccount> accounts = accountDao.findAll();
        return ResponseEntity.ok(accounts);
    }

    @RequestMapping(value = "/accounts", method = RequestMethod.POST)
    public ResponseEntity<?> saveAccount(@RequestBody AccountDTO account, Principal principal) throws Exception {
        DAOUser user = userDao.findByUsername(principal.getName());

        if (user == null) {
            throw new Exception("User not found");
        }

        DAOAccount newAccount = new DAOAccount();

        newAccount.setName(account.getName());
        newAccount.setColor(account.getColor());
        newAccount.setBalance(account.getInitialValue());
        newAccount.setIcon(account.getIcon());
        newAccount.setInitialValue(account.getInitialValue());
        newAccount.setUser(user);

        accountDao.save(newAccount);
        return ResponseEntity.ok(newAccount);
    }

    @RequestMapping(value = "/accounts", method = RequestMethod.PUT)
    public ResponseEntity<?> editAccount(@RequestBody AccountDTO account, Principal principal) throws Exception {

        DAOAccount accountToEdit = accountDao.findById(account.getId());
        DAOUser user = userDao.findByUsername(principal.getName());

        if (accountToEdit == null) {
            throw new Exception("Account not found");
        }

        if(accountToEdit.getUser() != user) {
            throw new Exception("No permissions");
        }

        accountToEdit.setName(account.getName());
        accountToEdit.setColor(account.getColor());
        accountToEdit.setIcon(account.getIcon());

        accountDao.save(accountToEdit);
        return ResponseEntity.ok(accountToEdit);
    }

    @RequestMapping(value = "/accounts", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAccount(@RequestBody AccountDTO account, Principal principal) throws Exception {

        DAOUser user = userDao.findByUsername(principal.getName());
        DAOAccount accountToDelete = accountDao.findById(account.getId());

        if (accountToDelete == null) {
            throw new Exception("Account not found");
        }
        if(accountToDelete.getUser() != user) {
            throw new Exception("No permissions");
        }

        accountDao.delete(accountToDelete);
        return ResponseEntity.ok(accountToDelete);
    }
}