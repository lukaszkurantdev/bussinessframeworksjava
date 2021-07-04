package main.java.com.javainuse.dao;

import main.java.com.javainuse.model.DAOPrivilege;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeDao extends CrudRepository<DAOPrivilege, Integer> {
    DAOPrivilege findByName(String name);
}