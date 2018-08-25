# 연습문제 - SQL
```sql
-- 테이블 복사
create table book
as
select * from test3.book ;

create table customer
as
select * from test3.customer ;

create table orders
as
select * from test3.orders ;

-- 1
select bookname
  from book
 where bookid = 1 ;

-- 2
select bookname
  from book
 where price >= 20000 ;

-- 3
select sum(saleprice)
  from customer, orders
 where name = '박지성'
   and customer.custid = orders.custid ;

---- answer
select sum(saleprice)
  from customer join orders using (custid)
 where customer.name = '박지성' ;

-- 4
select count(*)
  from customer, orders
 where name = '박지성'
   and customer.custid = orders.custid ;

---- answer
select count(*)
from customer join orders using(custid)
where customer.name = '박지성' ;

-- 5
select count(distinct publisher)
  from customer, orders, book
 where name = '박지성'
   and customer.custid = orders.custid
   and book.bookid = orders.bookid ;

---- answer 1
select count(distinct publisher)
  from (select *
          from customer join orders using (cusid)
         where customer.name = '박지성')
          join book using(bookid) ;

---- answer 2 ***
select count(distinct publisher)
  from customer join orders using (cusid)
                join book using(bookid)
 where customer.name = '박지성' ;

-- 6
select bookname, price, price - saleprice
  from customer, orders, book
 where name = '박지성'
   and customer.custid = orders.custid
   and book.bookid = orders.bookid ;

---- answer
select bookname, price, price - saleprice
  from (select bookid, saleprice
          from customer join orders using(custid)
         where customer.name = '박지성')
       join book using(bookid) ;

-- 7
select bookname
  from book
 where bookname not in (select bookname
                          from customer, orders, book
                         where name = '박지성'
                           and customer.custid = orders.custid
                           and book.bookid = orders.bookid ) ;

---- answer
select bookname
  from book
 where bookid not in (select bookid
                        from customer join orders using(custid)
                       where name = '박지성') ;

---- cf.
select bookid
  from customer c join orders o
       on(c.custid = o.custid)
 where c.name = '박지성' ;

-- 8
select count(*)
  from book ;

-- 9
select count(distinct publisher)
  from book;

-- 10
select name, address
  from customer ;

-- 11
select *
  from orders
 where orderdate between '20140704' and '20140707' ;

---- answer
select *
  from orders
 where orderdate between to_date('20140704', 'yyyymmdd')
                 and to_date('20140707', 'yyyymmdd') ;

-- 12
select *
  from orders
 where orderdate not between '20140704' and '20140707' ;

-- 13
select name, address
  from customer
 where substr(name, 1, 1) = '김' ;

---- answer
select name, address
  from customer
 where name like '김%' ;

-- 14
select name
from customer
where name not in (select distinct name
                     from customer, orders
                    where customer.custid = orders.custid) ;

---- answer
select name
  from customer
 where name not in (select name
                      from orders join customer using(custid)) ;

-- 15
select sum(saleprice), avg(saleprice)
  from orders ;

-- 16
select name, sum(saleprice)
  from customer, orders
 where customer.custid = orders.custid
 group by name ;

---- answer
select name, sum(saleprice)
  from orders join customer using(cusid)
 group by name ;

-- 17
select *
  from orders
 where orderid = (select orderid
                    from (select orderid, price - saleprice
                            from orders, book
                           where book.bookid = orders.bookid
                           order by price - saleprice desc)
                   where rownum = 1) ;

---- answer
select *
  from book join orders using(bookid)
 where price - saleprice = (select max(price - saleprice)
                              from book join orders using(bookid)) ;

-- 18
select name
  from orders join customer using(custid)
 group by name 
having avg(saleprice) > (select avg(saleprice)
                           from orders) ;
```