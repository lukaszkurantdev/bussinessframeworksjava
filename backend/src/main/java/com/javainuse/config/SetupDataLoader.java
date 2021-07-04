package main.java.com.javainuse.config;

import main.java.com.javainuse.dao.PrivilegeDao;
import main.java.com.javainuse.dao.RoleDao;
import main.java.com.javainuse.dao.UserDao;
import main.java.com.javainuse.model.DAOPrivilege;
import main.java.com.javainuse.model.DAORole;
import main.java.com.javainuse.model.DAOUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class SetupDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PrivilegeDao privilegeDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup)
            return;
        DAOPrivilege readPrivilege
                = createPrivilegeIfNotFound("READ_PRIVILEGE");
        DAOPrivilege writePrivilege
                = createPrivilegeIfNotFound("WRITE_PRIVILEGE");
        DAOPrivilege checkUsersAccountsPrivilege
                = createPrivilegeIfNotFound("CHECK_USERS_PRIVILEGE");

        List<DAOPrivilege> adminPrivileges = Arrays.asList(
                readPrivilege, writePrivilege, checkUsersAccountsPrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege, writePrivilege));

        DAORole adminRole = roleDao.findByName("ROLE_ADMIN");
        DAOUser user = new DAOUser();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        user.setRoles(Arrays.asList(adminRole));
        userDao.save(user);

        alreadySetup = true;
    }

    @Transactional
    DAOPrivilege createPrivilegeIfNotFound(String name) {

        DAOPrivilege privilege = privilegeDao.findByName(name);
        if (privilege == null) {
            privilege = new DAOPrivilege(name);
            privilegeDao.save(privilege);
        }
        return privilege;
    }

    @Transactional
    DAORole createRoleIfNotFound(
            String name, Collection<DAOPrivilege> privileges) {

        DAORole role = roleDao.findByName(name);
        if (role == null) {
            role = new DAORole(name);
            role.setPrivileges(privileges);
            roleDao.save(role);
        }
        return role;
    }
}
