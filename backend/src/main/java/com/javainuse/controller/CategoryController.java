package main.java.com.javainuse.controller;

import java.security.Principal;
import java.util.List;

import main.java.com.javainuse.dao.CategoryDao;
import main.java.com.javainuse.dao.UserDao;
import main.java.com.javainuse.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private CategoryDao categoryDao;

    @RequestMapping({ "/categories" })
    public ResponseEntity<?> getCategories(Principal principal) throws Exception {
        DAOUser user = userDao.findByUsername(principal.getName());
        List<DAOCategory> categories = categoryDao.findAllByUser(user);
        return ResponseEntity.ok(categories);
    }

    @RequestMapping(value = "/categories", method = RequestMethod.POST)
    public ResponseEntity<?> saveCategory(@RequestBody CategoryDTO category, Principal principal) throws Exception {
        DAOUser user = userDao.findByUsername(principal.getName());

        if (user == null) {
            throw new Exception("User not found");
        }

        DAOCategory newCategory = new DAOCategory();

        newCategory.setName(category.getName());
        newCategory.setColor(category.getColor());
        newCategory.setIcon(category.getIcon());
        newCategory.setPayout(category.isPayout());
        newCategory.setUser(user);

        categoryDao.save(newCategory);
        return ResponseEntity.ok(newCategory);
    }

    @RequestMapping(value = "/categories", method = RequestMethod.PUT)
    public ResponseEntity<?> editCategory(@RequestBody CategoryDTO category, Principal principal) throws Exception {

        DAOUser user = userDao.findByUsername(principal.getName());
        DAOCategory categoryToEdit = categoryDao.findById(category.getId());

        if (categoryToEdit == null) {
            throw new Exception("Account not found");
        }

        if(categoryToEdit.getUser() != user) {
            throw new Exception("No permissions");
        }

        categoryToEdit.setName(category.getName());
        categoryToEdit.setColor(category.getColor());
        categoryToEdit.setIcon(category.getIcon());
        categoryToEdit.setPayout(category.isPayout());

        categoryDao.save(categoryToEdit);
        return ResponseEntity.ok(categoryToEdit);
    }

    @RequestMapping(value = "/categories", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAccount(@RequestBody CategoryDTO category, Principal principal) throws Exception {

        DAOUser user = userDao.findByUsername(principal.getName());
        DAOCategory categoryToDelete = categoryDao.findById(category.getId());

        if (categoryToDelete == null) {
            throw new Exception("Account not found");
        }
        if(categoryToDelete.getUser() != user) {
            throw new Exception("No permissions");
        }

        categoryDao.delete(categoryToDelete);
        return ResponseEntity.ok(categoryToDelete);
    }
}