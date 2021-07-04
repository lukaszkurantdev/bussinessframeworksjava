package main.java.com.javainuse.dao;

import main.java.com.javainuse.model.DAOTransaction;
import main.java.com.javainuse.model.DAOUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDao extends CrudRepository<DAOTransaction, Integer> {
    List<DAOTransaction> findAllByUser(DAOUser user);
    DAOTransaction findById(long id);
}
