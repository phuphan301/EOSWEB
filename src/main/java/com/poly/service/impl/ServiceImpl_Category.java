package com.poly.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.dao.Categorydao;
import com.poly.entity.Category;
import com.poly.service.Service_Category;

@Service
public class ServiceImpl_Category implements Service_Category{
	@Autowired private Categorydao cateDao;

	@Override
	public List<Category> findAll() {
		return cateDao.findAll();
	}
}
