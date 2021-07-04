package main.java.com.javainuse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class DAORole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Collection<DAOUser> users;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "roles_privileges",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "privilege_id", referencedColumnName = "id"))
    private Collection<DAOPrivilege> privileges;

    public DAORole(String name) {
        this.name = name;
    }

    public DAORole() {

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

    public Collection<DAOUser> getUsers() {
        return users;
    }

    public void setUsers(Collection<DAOUser> users) {
        this.users = users;
    }

    public Collection<DAOPrivilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Collection<DAOPrivilege> privileges) {
        this.privileges = privileges;
    }
}
