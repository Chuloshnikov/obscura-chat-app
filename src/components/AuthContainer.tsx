import { obscuraImg } from '@/assets';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';


const AuthContainer = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
  return (
    <div className="auth-layout">
        {children}
      <div
        className={`absolute -top-20 -z-10' ${theme === 'dark' ? 'opacity-90' : 'opacity-10'}`}
      >
          <img src={obscuraImg} alt="logo" width={900} height={900} />
      </div>

    </div>
  )
}

export default AuthContainer;