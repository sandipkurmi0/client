import { FC } from "react";
import Nav from "../../common/Nav";
import { Outlet } from "react-router-dom";

const Dashboard: FC = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Dashboard;
