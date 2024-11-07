import { Title } from "./style";
import UserList from '../../components/UserList'
import DeptList from '../../components/DeptList'

const Home = () => {
    return( 
    <>
        <Title>SSTORM</Title>
        <UserList />
        <DeptList />
    </>)
};
  
export default Home;