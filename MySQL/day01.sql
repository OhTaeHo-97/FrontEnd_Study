#한줄 주석

#데이터베이스 생성
create database frontend;
show databases;

#데이터베이스 삭제
drop database frontend;

#데이터베이스 사용
use frontend;

# 테이블
	#데이터를 행과 열로 스키마에 따라 저장할 수 있는 구조
# 스키마
	#데이터베이스의 구조와 제약 조건에 관한 명세를 기술한 집합

#DDL(Data Definition Language) - 데이터 정의어
#테이블 생성
create table car(
	carnum	int,
	brand	varchar(300),
    color	varchar(300),
	price	int
);
show tables;

create table tb_user (
	useridx	int	primary key	auto_increment,
	userid	varchar(300) unique not null,
    userpw	varchar(300) not null,
	username varchar(300) not null,
    userphone varchar(300) not null,
    useremail varchar(300),
    userhobby varchar(1000),
    zipcode	varchar(300) not null,
    address1 varchar(300),
    address2 varchar(1000) not null,
    address3 varchar(300),
    regdate	datetime default now()
);
desc tb_user;
drop table tb_user;

# now() -> 현재 시간

# 테이블 컬럼 추가
alter table tb_user add (userpoint int default 0);

# 테이블 컬럼 수정
alter table tb_user modify column userpoint double default 0;

# 테이블 컬럼 삭제
alter table tb_user drop userpoint;