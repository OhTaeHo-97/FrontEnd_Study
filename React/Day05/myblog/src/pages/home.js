import HomeMain from "../components/homeMain";
import AppLayout from "../_layout/appLayout";

const Home = () => {
    return (
        <AppLayout>
            <HomeMain/>
        </AppLayout>
        // 감싼 것이 AppLayout에 chiildren으로 들어감(AppLayout으로 감싼 것이 children으로 들어온다는 것)
    );
}

export default Home;