import NavBar from '../components/Navbar'
import UserProfile from '../features/user/components/UserProfile';
import Footer from '../components/footer';
function UserProfilePage() {
  return (
    <div className=' max-h-screen'>
      <NavBar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfile></UserProfile>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default UserProfilePage;