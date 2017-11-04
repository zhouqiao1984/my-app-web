package com.xhl.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xhl.entity.User;

@Repository
public interface UserDao {

	User findUser(Map<String, String> pmap);
}
