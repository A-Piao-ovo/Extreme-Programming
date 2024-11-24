package com.example.demo.entity;

/**
 * @Author: limisc
 * @Date: 2024-10-30  15:02
 * @Description:
 */

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("contacts")
public class Contact {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    private String phone;
    private Integer age; // 新增字段
    private String gender; // 新增字段
    private String address; // 新增字段
}



