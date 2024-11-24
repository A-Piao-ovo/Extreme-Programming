package com.example.demo.controller;

/**
 * @Author: limisc
 * @Date: 2024-10-30  15:14
 * @Description:
 */

import com.example.demo.entity.Contact;
import com.example.demo.service.ContactService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Resource
    private ContactService contactService;

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @GetMapping("/{id}")
    public Contact getContact(@PathVariable Integer id) {
        return contactService.getContactById(id);
    }

    @PostMapping
    public void addContact(@RequestBody Contact contact) {
        contact.setId(null); // 确保不传入 id
        contactService.addContact(contact);
    }

    @PutMapping
    public void updateContact(@RequestBody Contact contact) {
        contactService.updateContact(contact);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Integer id) {
        contactService.deleteContact(id);
    }
}


