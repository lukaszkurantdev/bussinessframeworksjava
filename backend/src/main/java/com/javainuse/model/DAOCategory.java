package main.java.com.javainuse.model;

import javax.persistence.*;

@Entity
@Table(name = "category")
public class DAOCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(
            name = "user_report_fk",
            foreignKey = @ForeignKey(name = "none", value = ConstraintMode.NO_CONSTRAINT)
    )
    private DAOUser user;

    @Column
    private String name;

    @Column
    private String icon;

    @Column
    private String color;

    @Column
    private boolean isPayout;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public DAOUser getUser() {
        return user;
    }

    public void setUser(DAOUser user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isPayout() {
        return isPayout;
    }

    public void setPayout(boolean payout) {
        isPayout = payout;
    }
}

