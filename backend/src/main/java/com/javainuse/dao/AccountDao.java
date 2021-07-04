package main.java.com.javainuse.dao;

import main.java.com.javainuse.model.DAOAccount;
import main.java.com.javainuse.model.DAOUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDao extends CrudRepository<DAOAccount, Integer> {
    List<DAOAccount> findAll();
    List<DAOAccount> findAllByUser(DAOUser user);
    DAOAccount findById(long id);
}
