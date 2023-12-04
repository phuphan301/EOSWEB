package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.entity.OrderDetail;

@Repository
public interface OrderDetaildao extends JpaRepository<OrderDetail, Long>{
	 @Query("Select od from OrderDetail od where od.order.id =:id")
	    List<OrderDetail> findListOrderDetails(Long id);
}
