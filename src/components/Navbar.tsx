import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from 'lucide-react';
import { obscuraImg } from '@/assets';
import ThemeSwitcher from './ThemeSwitcher';
import { Button } from './ui/button';

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
            <div className="size-9 bg-white flex items-center justify-center rounded-full">
              <img src={obscuraImg} alt="logo" width={80} height={80}/>
            </div>
            <h1 className="text-lg font-bold">Obscura</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher/>

          {authUser && (
            <>
              <Button
              variant="ghost"
              size="icon"
              >
                  <Link to={"/profile"}>
                    <User className="size-5" />
                  </Link>
              </Button>

              <Button 
              variant="ghost"
              size="icon"
              onClick={logOut}>
                <LogOut className="size-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
  );
}

export default Navbar;