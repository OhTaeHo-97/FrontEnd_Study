import { Nav } from "react-bootstrap";

const AppLayout = ({children}) => {
    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Main</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/register">Registration</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
            </Nav>
            <div>{children}</div>
            {/* 들어온 것의 위치를 우리 마음대로 설정할 수 있음! */}
        </>
    );
}

export default AppLayout;