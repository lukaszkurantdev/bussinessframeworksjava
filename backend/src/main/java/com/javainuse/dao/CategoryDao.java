package main.java.com.javainuse.dao;

import main.java.com.javainuse.model.DAOCategory;
import main.java.com.javainuse.model.DAOUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryDao extends CrudRepository<DAOCategory, Integer> {
    List<DAOCategory> findAllByUser(DAOUser user);
    DAOCategory findById(long id);
}
