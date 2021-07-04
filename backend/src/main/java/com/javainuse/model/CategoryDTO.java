package main.java.com.javainuse.model;

public class CategoryDTO {
    private long id;
    private String name;
    private String icon;
    private String color;
    private boolean isPayout;

    public CategoryDTO() {
    }

    public CategoryDTO(long id, String name, String icon, String color, boolean isPayout) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.isPayout = isPayout;
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
