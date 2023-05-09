
import CNav from './CollapsibleSideBar';

const Layout = ({ children }) => {

  return (
    <div className=" min-h-screen flex ">
      <CNav />
      <div className="w-[120%] p-4 ">
        <ul className="background">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {children}
      </div>
    </div>
  );
};

export default Layout;
