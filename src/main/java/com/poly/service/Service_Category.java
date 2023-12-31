package com.poly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poly.entity.Category;

@Service
public interface Service_Category {

	List<Category> findAll();
	
	Category update(Category category);
	
	Category create(Category category);

}
