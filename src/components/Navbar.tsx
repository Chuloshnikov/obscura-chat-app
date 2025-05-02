import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from 'lucide-react';
import { obscuraImg } from '@/assets';

const Navbar = () => {
  const { logOut, authUser } = useAuthStore();
  return (
    <header
    className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80"
  >
    <div className="container mx-auto px-4 h-16">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 bg-primary/10 flex items-center justify-center  rounded-full">
              <img src={obscuraImg} alt="logo" width={80} height={80}/>
            </div>
            <h1 className="text-lg font-bold">Obscura</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div>theme</div>

          {authUser && (
            <>
              <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button className="flex gap-2 items-center cursor-pointer" onClick={logOut}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
  );
}

export default Navbar;