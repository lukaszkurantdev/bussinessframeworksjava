package main.java.com.javainuse.model;

import java.io.Serializable;
import java.util.Collection;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private Collection<DAORole> roles;


	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public JwtResponse(String jwttoken, Collection<DAORole> roles) {
		this.jwttoken = jwttoken;
		this.roles = roles;
	}

	public String getToken() {
		return this.jwttoken;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getJwttoken() {
		return jwttoken;
	}

	public Collection<DAORole> getRoles() {
		return roles;
	}

	public void setRoles(Collection<DAORole> roles) {
		this.roles = roles;
	}
}