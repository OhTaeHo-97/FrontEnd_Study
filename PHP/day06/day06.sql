use frontend;

# 유저 테이블에 없는 아이디가 여기 들어가면 안되니 userid 넣어줄 것임(로그인 가능한 사람의 데이터로 들어가야 함)
create table tb_board(
	boardidx bigint auto_increment primary key,
    boardtitle varchar(1000) not null,
    boardcontent text,
    userid varchar(300) not null,
    boardhit int default 0,
    boardregdate datetime default now(),
    boardlike int default 0,
    constraint board_user_fk foreign key(userid)
    references tb_user(userid)
);

select * from tb_board;

select count(boardidx) total from tb_board;

# limit을 통해 10개를 뽑아냄(앞에는 시작 위치, 뒤에가 개수)
select boardidx, boardtitle, userid, boardhit, boardlike, boardregdate
from tb_board order by boardidx desc limit 0, 10;

# 2페이지라면 10부터 10개 가져와야 하므로 limit 10, 10
select boardidx, boardtitle, userid, boardhit, boardlike, boardregdate
from tb_board order by boardidx desc limit 10, 10;