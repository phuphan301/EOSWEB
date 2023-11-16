package com.poly.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.entity.OrderDetail;

@Repository
public interface OrderDetaildao extends JpaRepository<OrderDetail, Long>{

}
