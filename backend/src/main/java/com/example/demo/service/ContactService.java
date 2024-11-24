package com.example.demo.service;

/**
 * @Author: limisc
 * @Date: 2024-10-30  15:12
 * @Description:
 */

import com.example.demo.entity.Contact;

import java.util.List;

public interface ContactService {
    List<Contact> getAllContacts();
    Contact getContactById(Integer id);
    void addContact(Contact contact);
    void updateContact(Contact contact);
    void deleteContact(Integer id);
}

