package main.java.com.javainuse.dao;

import main.java.com.javainuse.model.DAORole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends CrudRepository<DAORole, Integer> {
    DAORole findByName(String name);
}