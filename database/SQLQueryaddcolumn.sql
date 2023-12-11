/*After create database for project, You need run this query to update many column for some table later. */
alter table products 
add Screen varchar(100),
 Cpu varchar(50),
 Ram varchar(50),
Harddrive varchar(50);
alter table categories 
add available bit,
image varchar(100);
/*03/12/2023*/
alter table Orders
add Total float;
alter table Orders
add Status varchar(50);
/*04/12/2023*/
ALTER TABLE dbo.Accounts
ALTER COLUMN Password NVARCHAR(MAX);
alter table Products
add Description nvarchar(100);
alter table Products
alter column Description nvarchar(max)
/*08/12/2023*/
alter table Accounts
add Phonenumber varchar(50);
/*09/12/2023*/
select p.Name, SUM(o.Quantity) as TotalQuantity, SUM(o.Quantity * o.Price) as Revenue, Orders.CreateDate from OrderDetails o 
inner join Products p on o.ProductId = p.Id 
inner join Orders on o.OrderId = Orders.Id
where Orders.CreateDate >= '2023-01-01' and Orders.CreateDate <= '2023-12-30'
group by p.Name, Orders.CreateDate
order by Revenue desc, Orders.CreateDate desc
GO
CREATE PROCEDURE getRevenueProductByDate 
@StartDate DATE,
@EndDate DATE 
AS
BEGIN
select p.Name, SUM(o.Quantity) as TotalQuantity, SUM(o.Quantity * o.Price) as Revenue, Orders.CreateDate from OrderDetails o 
inner join Products p on o.ProductId = p.Id 
inner join Orders on o.OrderId = Orders.Id
where Orders.CreateDate >= @StartDate and Orders.CreateDate <= @EndDate
group by p.Name, Orders.CreateDate
order by Revenue desc, Orders.CreateDate desc
END

exec getRevenueProductByDate '2023-01-01', '2023-12-09' 
drop proc getRevenueProductByDate

GO
CREATE PROCEDURE getRevenueCategoriesByDate
@StartDate DATE,
@EndDate DATE 
AS
BEGIN
select c.Name, SUM(od.Quantity) as TotalQuantity, SUM(od.Quantity * od.Price) as Revenue
from Categories c 
inner join Products p on c.Id = p.CategoryId
inner join OrderDetails od on p.Id = od.ProductId 
inner join Orders o on o.Id = od.OrderId
where o.CreateDate >= @StartDate and o.CreateDate <= @EndDate
group by c.Name
END
exec getRevenueCategoriesByDate '2023-01-01', '2023-12-09'
select c.Name, SUM(od.Quantity) as TotalQuantity, SUM(od.Quantity * od.Price) as Revenue
from Categories c 
inner join Products p on c.Id = p.CategoryId
inner join OrderDetails od on p.Id = od.ProductId 
inner join Orders o on o.Id = od.OrderId
group by c.Name
/*where o.CreateDate >= '2023-01-01' and o.CreateDate <= '2023-12-09'*/
alter table Products
add Description nvarchar(100);
alter table Products
alter column Description nvarchar(max)
select * from Accounts where Fullname like '%' + 'fullname' +'%'