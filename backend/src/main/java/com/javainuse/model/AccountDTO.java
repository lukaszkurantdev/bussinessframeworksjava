package main.java.com.javainuse.model;

public class AccountDTO {
    private long id;
    private String name;
    private double initialValue;
    private String icon;
    private String color;

    public AccountDTO() {
    }

    public AccountDTO(long id, String name, double initialValue, String icon, String color) {
        this.id = id;
        this.name = name;
        this.initialValue = initialValue;
        this.icon = icon;
        this.color = color;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getInitialValue() {
        return initialValue;
    }

    public void setInitialValue(double initialValue) {
        this.initialValue = initialValue;
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
}
