import NavBar from '../../components/NavBar';
import VideoBackground from './VideoBackground';

const Homepage = ({ user }) => {
  const profilePic = user?.avatar_url;

  return (
    <div className="h-[100vh] w-full">
      <NavBar profilePic={profilePic}></NavBar>
      <div className="flex items-center justify-center h-[90vh]">
        <VideoBackground />
      </div>
    </div>
  );
};

export default Homepage;
