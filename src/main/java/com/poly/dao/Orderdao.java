package com.poly.dao;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.poly.entity.Order;

@Repository
public interface Orderdao extends JpaRepository<Order, Long>{

	@Query("Select o from Order o Where o.account.username= ?1")
	List<Order> findByUsername(String username);

	/*Summary*/
	@Query(value = "Select count(*) from Orders where CreateDate = CAST( GETDATE() AS Date)",nativeQuery= true)
	Long getTodayOrder();

	@Query(value = "Select t.last7Days as 'date', ISNULL(sum(price*quantity),0) as ' totalPayment' "
			+ "From (Select cast(Getdate()as Date) last7Days  "
			+ "	Union all "
			+ "	Select DateAdd(day,-1,cast(getdate()as date)) "
			+ "	Union all "
			+ "	Select DateAdd(day,-2,cast(getdate()as date)) "
			+ "	Union all "
			+ "	Select DateAdd(day,-3,cast(getdate()as date)) "
			+ "	Union all "
			+ "	Select DateAdd(day,-4,cast(getdate()as date)) "
			+ "	Union all "
			+ "	Select DateAdd(day,-5,cast(getdate()as date)) "
			+ "	Union all "
			+ "	Select DateAdd(day,-6,cast(getdate()as date)) "
			+ "	Union all "
			+ "	Select DateAdd(day,-7,cast(getdate()as date)) "
			+ ") t Left Join Orders t1 on cast(t.last7Days as date) = Cast(t1.CreateDate as date) "
			+ "left join OrderDetails dt on  t1.Id = dt.OrderId "
			+ "Group by cast(t.last7Days as Date)", nativeQuery = true)
	List<Object[]> getRevenueLast7Days();
	
	@Query("Select o from Order o")
	Page<Order> findAllPage(Pageable pageable);

	@Query("Select o from Order o where o.id = :id")
	Page<Order> findSearchIdPage(Pageable pageable, Long id);

	@Query("Select o from Order o where o.account.username LIKE %:username%")
	Page<Order> findSearchUserPage(Pageable pageable, String username);

	@Query("SELECT o FROM Order o WHERE o.createDate BETWEEN :startDate AND :endDate")
	Page<Order> findDatePage(Pageable pageable, Date startDate, Date endDate);

	@Query("Select o from Order o where o.id =:id")
	Order findByOrderId(Long id);
	
	@Procedure(name = "getRevenueProductByDate")
	List<Object[]> getRevenueProductByDate(@Param("StartDate") LocalDate startDate, @Param("EndDate") LocalDate endDate);
	
	@Query(value = "select p.Name, SUM(o.Quantity) as TotalQuantity, SUM(o.Quantity * o.Price) as Revenue, Orders.CreateDate from OrderDetails o \r\n"
			+ "inner join Products p on o.ProductId = p.Id \r\n"
			+ "inner join Orders on o.OrderId = Orders.Id\r\n"
			+ "group by p.Name, Orders.CreateDate\r\n"
			+ "order by Revenue desc, Orders.CreateDate desc", nativeQuery = true)
	List<Object[]> getRevanuePrOrders();
	
	@Query(value = "select c.Name, SUM(od.Quantity) as TotalQuantity, SUM(od.Quantity * od.Price) as Revenue\r\n"
			+ "from Categories c \r\n"
			+ "inner join Products p on c.Id = p.CategoryId\r\n"
			+ "inner join OrderDetails od on p.Id = od.ProductId \r\n"
			+ "inner join Orders o on o.Id = od.OrderId\r\n"
			+ "group by c.Name", nativeQuery = true)
	List<Object[]> getRevanueCategories();
	
	@Procedure(name = "getRevenueCategoriesByDate")
	List<Object[]> getRevenueCategoriesByDate(@Param("StartDate") LocalDate startDateCate, @Param("EndDate") LocalDate endDate);
}
