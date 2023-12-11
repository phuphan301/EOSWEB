package com.poly.controller.rest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.poly.entity.Order;
import com.poly.entity.OrderDetail;
import com.poly.service.Service_Order;
import com.poly.service.impl.ServiceImpl_Order;
import com.poly.service.impl.ServiceImpl_OrderDetail;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/orders")
public class OrderRest {
	@Autowired private Service_Order ordertService;
	
	@Autowired
	private ServiceImpl_OrderDetail serviceImpl_OrderDetail;

	@Autowired
	private ServiceImpl_Order serviceImpl_Order;
	
	@PostMapping()
	public Order create(@RequestBody JsonNode orderData) {
		return ordertService.create(orderData);
	}
	
	@GetMapping()
	public List<Order>getAll(){
		return ordertService.findAll();
	}
	
	@GetMapping("/getListOrder/{page}")
	public Page<Order> getOrderList(@PathVariable int page) {
		return serviceImpl_Order.findAllPage(page, 10);
	}

	@GetMapping("/searchListOrderUser/{page}/{username}")
	public Page<Order> searchListOrderUser(@PathVariable int page, @PathVariable String username) {
		return serviceImpl_Order.findsearchListOrderUserPage(page, 10, username);
	}

	@GetMapping("/searchListOrderId/{page}/{id}")
	public Page<Order> searchListOrderId(@PathVariable int page, @PathVariable Long id) {
		return serviceImpl_Order.findsearchListOrderIdPage(page, 10, id);
	}

	@GetMapping("/detailOrder/{id}")
	public List<OrderDetail> detailOrder(@PathVariable Long id) {
		return serviceImpl_OrderDetail.findListOrderDetail(id);
	}

	@GetMapping("/orderById/{id}")
	public Order orderById(@PathVariable Long id) {
		return serviceImpl_Order.findByOrderId(id);
	}

	@GetMapping("/filterDatePage/{startDate}/{endDate}")
	public Page<Order> filterDatePage(@PathVariable Date startDate, @PathVariable Date endDate) {
		return serviceImpl_Order.findDatePage(0, 10, startDate, endDate);
	}
	@PutMapping("{id}")
	public Order update(@RequestBody Order order, @PathVariable("id") Integer id) {
		return ordertService.update(order);
	}
	
	@Transactional
	@GetMapping("/byDate")
	public List<Object[]> getRevanueProductByDate(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
		System.out.println("Start Date: "+startDate);
		System.out.println("End Date: "+endDate);
		return ordertService.getRevenueProductByDate(startDate, endDate);
	}
	
	@GetMapping("/RevenueProduct")
	public List<Object[]> getRevenueProductOrder(){
		return ordertService.getRevanuePrOrders();
	}
	
	@GetMapping("/RevenueCategories")
	public List<Object[]> getRevenueCategories(){
		return ordertService.getRevanueCategories();
	}
	
	@Transactional
	@GetMapping("/Categories/byDate")
	public List<Object[]> getRevanueCategoriesByDate(@RequestParam("startDateCate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDateCate,
			@RequestParam("endDateCate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDateCate){
		return ordertService.getRevenueCategoriesByDate(startDateCate, endDateCate);
	}
}
