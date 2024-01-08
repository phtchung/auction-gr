import React, { useMemo } from "react";
import {
  Navbar,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleClick = () => {
    navigate("/user/profile");
    setIsMenuOpen(false);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <div
          color="blue-gray"
          className="flex cursor-pointer items-center gap-1 hover:border-none outline-none rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </div>
      </MenuHandler>
      <MenuList className="p-1">
        return (
        <MenuItem
          onClick={handleClick}
          className="flex items-center gap-2 rounded hover:outline-none"
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Tài khoản của tôi
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Đăng xuất
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

const Header = () => {
  // profile menu component
  const accessToken = useMemo(() => localStorage.getItem("accessToken"), []);

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
  return (
    <>
      <Navbar className=" left-0 py-2  absolute">
        <div className="relative  flex items-center justify-between text-blue-gray-900">
          <Typography className="mr-4 ml-2 text-black cursor-pointer py-1.5 font-medium">
            Home
          </Typography>
          <div className="flex gap-6">
            {!accessToken && (
              <>
                <button
                  className="bg-black text-sm "
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
              </>
            )}
            {accessToken && <ProfileMenu />}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
