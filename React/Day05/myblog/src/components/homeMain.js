import {Button} from "react-bootstrap";
import {Link} from "react-router-dom"; // a 태그와 비슷하다고 생각하면 됨

const HomeMain = () => {
    return (
        <Link to="/register">
            <Button variant="outline-primary">회원가입</Button>
        </Link>
    );
    // Link로 감싸면 버튼을 클릭했을 때 to에 적혀있는 주소로 이동함
}

export default HomeMain;