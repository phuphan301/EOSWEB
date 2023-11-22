package com.poly.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.entity.Category;
import com.poly.service.Service_Category;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/categories")
public class CategoryRest {
	@Autowired private Service_Category cateService;
	
	@GetMapping()
	public List<Category> findAll() {
		return cateService.findAll();
	}
	
	@PostMapping
	public Category create(@RequestBody Category category) {
		return cateService.create(category);
	}
	
	@PutMapping("{id}")
	public Category update(@RequestBody Category category, @PathVariable("id")Integer id) {
		return cateService.update(category);
	}
}
