package com.poly.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}
