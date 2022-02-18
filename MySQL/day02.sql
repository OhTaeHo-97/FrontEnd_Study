use frontend;

# 컬럼들을 써준 경우에는 뒤에 올 값으로 그 컬럼들에 들어갈 값들을 써준다
# 컬럼의 개수와 자료형에 알맞게 순서대로 써주어야 한다.
insert into car(brand, price) values("Ferrari", 65000);

# 컬럼을 생략한 경우에는 모든 컬럼에 값을 넣어주겠다는 뜻이다.
# 따라서 모든 컬럼에 들어갈 값들을 컬럼 순서대로 전부 작성해준다.
# 특정 컬럼에만 넣고 싶으면 컬럼명을 써주는 것
insert into car values("K7", "White", 7000);

SELECT * FROM frontend.car;

insert into tb_user(userid, userpw, username, userphone, useremail, userhobby, zipcode, address1, address2, address3)
values('apple', '1111', '김사과', '01012341234', 'apple@juice.com', '코딩', '10101', '서울시 강남구 테헤란로', '11-1 101동 101호', '(역삼동)');
insert into tb_user(userid, userpw, username, userphone, useremail, userhobby, zipcode, address1, address2, address3)
values('banana', '2222', '반하나', '01098769876', 'banana@juice.com', '영화', '10102', '서울시 서초구 과천대로', '22-1 15-3번지', '(방배동)');
insert into tb_user(userid, userpw, username, userphone, useremail, userhobby, zipcode, address1, address2, address3)
values('cherry', '3333', '이채리', '01011111111', 'cherry@juice.com', '게임', '15101', '안양시 동안구 관평로 138번길 63', '707동 1303호', '(퍙천동)');

SELECT * FROM frontend.tb_user;

# select로 간단하게 구조 확인하기
select * from tb_user;

#userpoint 컬럼 추가
alter table tb_user add (userpoint int default 0);

# update
# 조건이 없이 모든 행을 수정해야 한다면 조건절 생략 가능
update tb_user set userpoint = 1000;
# safe mode로 인해 key값을 이용해서만 update 가능
# 그래서 safe mode를 풀어야 함
# safe 모드 해제 : edit - preferences - SQL Editor - 맨 아래의 Safe Updates 체크 해제 - 재실행

# apple의 포인트에 200포인트 추가
update tb_user set userpoint = userpoint + 200 where useridx = 1;

update tb_user set userpoint = userpoint - 200 where useridx = 2;
update tb_user set userpoint = userpoint * 2 where useridx = 3;

# delete
delete from car where brand = 'Ferrari';
select * from car;

# select
select userid, username, userpoint from tb_user;
select userid, username, userphone, address1 from tb_user where useridx = 2;
# =은 set 절에서는 대입, where 절에서는 같다의 의미
select username from tb_user where userpoint > 1000;
select username from tb_user where userid = 'apple' and userpw='1111';
# 부등호, 등호 사용 가능
# 논리연산자(and, or, not)

# userpoint가 500보다 크거나 같고 1500보다 작거나 같은 회원의 아이디, 이름, 포인트 검색
select userid, username, userpoint from tb_user where userpoint >= 500 and userpoint <= 1500;
# 컬럼 between A and B : 컬럼의 값이 A 이상 B 이하
select userid, username, userpoint from tb_user where userpoint between 500 and 1500;

insert into tb_user(userid, userpw, username, userphone, zipcode, address2)
values('durian', '4444', '차두리', '01024242424', '10001', '한강뷰아파트 101동 1001호');
update tb_user set userpoint = 1200 where userid = 'durian';

# email이 NULL인 사람의 이름 검색
# null의 값비교는 is null, is not null
select username from tb_user where useremail is null;
# 회원의 아이디가 apple 또는 banan 또는 cherry인 사람들의 이름 검색
select username from tb_user where userid = 'apple' or userid = 'banana' or userid = 'cherry';
# 컬럼 in (값1, 값2, ...) : 컬럼의 값이 값1, 값2,... 에 있으면 참
select username from tb_user where userid in('apple', 'banana', 'cherry');
# id에 'a'가 들어가는 모든 사람 검색
# % -> 모든 글자를 뜻함(%a% -> 사이에 a가 있다면 다 검색되는 것)(%a -> 맨 뒷글자가 a인 아무 문자열)
# '_a' -> 맨 뒷글자가 a인 두 글자 문자열을 뜻함(_가 한 글자를 뜻함)
select username from tb_user where userid like('%a%');

# 정렬
# order by 컬럼명 {정렬기준} : 컬럼을 기준으로 정렬(정렬기준 생략시 오름차순) - 정렬기준에 DESC : 내림차순
select * from tb_user order by userid desc;
# 정렬기준에서 같은 값일 때는 추가한 순서대로 나옴
select * from tb_user order by userpoint desc;
select * from tb_user order by userpoint desc, userid desc;

# 성별 컬럼 추가
# 남자 또는 여자 라는 문자열 중 하나만 들어올 수 있게 함
alter table tb_user add (usergender enum('남자', '여자'));
update tb_user set usergender = '남자' where useridx = 1 or useridx = 3;
update tb_user set usergender = '여자' where useridx = 2 or useridx = 4;

# 그룹함수(집계함수)
select sum(userpoint) from tb_user;
select sum(userpoint) from tb_user where usergender = '남자';
select sum(userpoint) from tb_user where usergender = '남자' or usergender = '여자';

# group by
# group by 컬럼, .... : 컬럼을 기준으로 그룹을 짓고 쿼리문 수행
select usergender, sum(userpoint) from tb_user group by usergender;

# where 절 - 데이터에 대한 조건
# 포인트가 2000 이하인 사람들만 모아서 usergender로 그룹을 나누고 그룹별 포인트 총합을 구해라!
select usergender, sum(userpoint) from tb_user where userpoint <= 2000 group by usergender;
# having절 - 그룹에 대한 조건
# usergender로 그룹을 나누고 그룹별 포인트 총합을 구한 후 포인트 총합이 2000보다 작거나 같은 그룹의 결과만 구해라!
select usergender, sum(userpoint) from tb_user group by usergender having sum(userpoint) <= 2000;

# 별칭
# 컬럼명 별칭, 컬럼명 as 별칭 / from 테이블명 별칭
select userid 아이디, username 이름, zipcode 우편번호, address1 "도로명 주소", address2 as "상세 주소" from tb_user;

# limit
select * from tb_user limit 2; # 처음주터 2개만 들고옴
select * from tb_user limit 1, 2; # 1번째(2행)부터 2개

create table tb_profile(
	useridx int not null,
    userage int,
    userbirthday varchar(300),
    userblood varchar(10),
    constraint profile_user_fk foreign key(useridx) references tb_user(useridx)
);
# profile_user_fk라고 이름을 줬는데(이름은 보통 어떤 테이블과 어떤 테이블을 잇는 것인지를 나타냄) 이름을 주고 싶지 않을 때에는 constraint 이름 부분을 제외하면 됨

# 외래키 제약조건 위배
insert into tb_profile values(10000, 100, '1923-12-13', 'O형');

insert into tb_profile values(1, 10, '2013-07-18', 'A형');
insert into tb_profile values(3, 30, '1993-04-01', 'O형');

select * from tb_profile;

# Join
select
	tb_user.username,
    tb_profile.userage,
    tb_profile.userbirthday,
    tb_profile.userblood
from tb_profile
	join tb_user on tb_user.useridx = tb_profile.useridx;
    
select
	u.username,
    p.userage,
    p.userbirthday,
    p.userblood
from tb_profile p
	join tb_user u on u.useridx = p.useridx;
    
# outer join
# right outer join -> 오른쪽 테이블에 있는 값들은 모두 다 나옴
# 먼저 써준 것이 왼쪽 테이블, 나중에 써준 것이 오른쪽 테이블이라고 생각하면 됨
# 어디 것을 다 내보낼 것인지 방향을 정해줘야 함!
select
	u.username,
    p.userage,
    p.userbirthday,
    p.userblood
from tb_profile p
	right outer join tb_user u on u.useridx = p.useridx;

delete from tb_profile;
delete from tb_user;

drop table tb_profile;
drop table tb_user;