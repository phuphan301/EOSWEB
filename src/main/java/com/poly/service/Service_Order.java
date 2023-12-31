package com.poly.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.entity.Order;


@Service
public interface Service_Order {
	Order create(JsonNode orderData);

	Order findById(Long id);

	List<Order> findByUsername(String username);

	Long getToDayOrder();

	Long totalOrder();

	List<Object[]> getRevenueLast7Days();
	List<Order> findAll();
	Order update(Order order);
	List<Object[]> getRevenueProductByDate(LocalDate startDate, LocalDate endDate);
	List<Object[]> getRevanuePrOrders();
	List<Object[]> getRevanueCategories();
	List<Object[]> getRevenueCategoriesByDate(LocalDate startDate, LocalDate endDate);
}
