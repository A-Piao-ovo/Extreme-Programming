package com.example.demo.mapper;

/**
 * @Author: limisc
 * @Date: 2024-10-30  15:13
 * @Description:
 */

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Contact;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ContactMapper extends BaseMapper<Contact> {
}

