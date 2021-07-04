package main.java.com.javainuse.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javassist.NotFoundException;
import main.java.com.javainuse.dao.RoleDao;
import main.java.com.javainuse.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import main.java.com.javainuse.dao.UserDao;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		DAOUser user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), true, true, true,
				true, getAuthorities(user.getRoles()));
	}

	private Collection<? extends GrantedAuthority> getAuthorities(
			Collection<DAORole> roles) {

		return getGrantedAuthorities(getPrivileges(roles));
	}

	private List<String> getPrivileges(Collection<DAORole> roles) {

		List<String> privileges = new ArrayList<>();
		List<DAOPrivilege> collection = new ArrayList<>();
		for (DAORole role : roles) {
			collection.addAll(role.getPrivileges());
		}
		for (DAOPrivilege item : collection) {
			privileges.add(item.getName());
		}
		return privileges;
	}

	private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for (String privilege : privileges) {
			authorities.add(new SimpleGrantedAuthority(privilege));
		}
		return authorities;
	}
	
	public DAOUser save(UserDTO user) throws Exception {
		DAOUser checkUser = userDao.findByUsername(user.getUsername());
		if (checkUser != null) {
			throw new Exception("User exist");
		}

		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setRoles(Arrays.asList(roleDao.findByName("ROLE_USER")));
		return userDao.save(newUser);
	}

	public DAOUser changePassword(String userName, PasswordDTO req) throws Exception {
		DAOUser user = userDao.findByUsername(userName);

		if (user == null) {
			throw new Exception("User not found");
		}

		String dd = bcryptEncoder.encode(req.getOldPassword());
		String dd2 = user.getPassword();
		if(bcryptEncoder.matches(req.getOldPassword(), user.getPassword())) {
			user.setPassword(bcryptEncoder.encode(req.getNewPassword()));
			return userDao.save(user);
		} else {
			throw new Exception("Old password not match");
		}
	}
}