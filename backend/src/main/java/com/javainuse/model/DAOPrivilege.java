package main.java.com.javainuse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class DAOPrivilege {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "privileges")
    private Collection<DAORole> roles;

    public DAOPrivilege(String name) {
        this.name = name;
    }

    public DAOPrivilege() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<DAORole> getRoles() {
        return roles;
    }

    public void setRoles(Collection<DAORole> roles) {
        this.roles = roles;
    }
}