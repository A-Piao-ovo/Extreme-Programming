package com.example.demo.service.impl;

/**
 * @Author: limisc
 * @Date: 2024-10-30  15:12
 * @Description:
 */

import com.example.demo.entity.Contact;
import com.example.demo.mapper.ContactMapper;
import com.example.demo.service.ContactService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Resource
    private ContactMapper contactMapper;

    @Override
    public List<Contact> getAllContacts() {
        return contactMapper.selectList(null);
    }

    @Override
    public Contact getContactById(Integer id) {
        return contactMapper.selectById(id);
    }

    @Override
    public void addContact(Contact contact) {
        contactMapper.insert(contact);
    }

    @Override
    public void updateContact(Contact contact) {
        contactMapper.updateById(contact);
    }

    @Override
    public void deleteContact(Integer id) {
        contactMapper.deleteById(id);
    }
}

