import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAuth } from "context/SupaContext";
import React from "react";
import { Button, Dropdown, Menu, Navbar } from "react-daisyui";
import { Link, NavLink } from "react-router-dom";
import { useSignOut } from "react-supabase-next";

import ThemeToggle from "../themeToggle/themeToggle";
import PawLogo from "./PawLogo.png";

const petList = ["Dog", "Cat", "Rabbit", "Horse", "Bird"];
export default function NavigationBar() {
  const { username, session } = useAuth();
  const [{ fetching }, signOut] = useSignOut();

  return (
    <Navbar className="navbar bg-base-100 shadow-xl rounded-box">
      <Navbar.Start className="navbar-start">
        <Dropdown>
          <Button tag="label" color="ghost" shape="circle" tabIndex={0} className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </Button>
          <Dropdown.Menu className="w-52 menu-sm mt-3 z-[1]">
            <DropdownNavLink route="/">Home</DropdownNavLink>
            <li tabIndex={0}>
              <a className="justify-between">
                Pets <ChevronRightIcon className="w-4" />
              </a>
              <ul className="p-2 bg-base-100">
                {petList.map(pet => (
                  <DropdownNavLink key={pet} route={`pets/${pet}`}>
                    {pet}
                  </DropdownNavLink>
                ))}
                <DropdownNavLink route="pets">All Pets</DropdownNavLink>
              </ul>
            </li>
            <MenuItemNavLink name="About" route="about" />
            <MenuItemNavLink name="Resources" route="resources" />
            <MenuItemNavLink name="Organizations" route="organizations" />
            <MenuItemNavLink name="Contact" route="contact" />
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Pawternity Hub
        </Link>
      </Navbar.Start>
      <Navbar.Center className="navbar-center hidden lg:flex">
        <Menu horizontal={true} className="px-1 flex-row">
          <MenuItemNavLink name="Home" route="/" />
          <Menu.Item>
            <details className="dropdown w-30">
              <summary>Pets</summary>
              <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100" role="menu">
                {petList.map(pet => (
                  <MenuItemNavLink key={pet} name={pet} route={`/pets/${pet.toLowerCase()}`} />
                ))}
                <MenuItemNavLink name="All Pets" route="pets" />
              </ul>
            </details>
          </Menu.Item>
          <MenuItemNavLink name="About" route="about" />
          <MenuItemNavLink name="Resources" route="resources" />
          <MenuItemNavLink name="Organizations" route="organizations" />
          <MenuItemNavLink name="Contact" route="contact" />
        </Menu>
      </Navbar.Center>
      <Navbar.End className="navbar-end">
        <ThemeToggle />
        <Dropdown className="dropdown-end">
          <Button tag="label" color="ghost" shape="circle" tabIndex={0}>
            <img src={PawLogo} alt="" />
          </Button>
          <Dropdown.Menu className="w-52 mt-3 z-[1]">
            <Dropdown.Item>{`Hello, ${username}`}</Dropdown.Item>
            {session ? (
              <>
                <MenuItemNavLink name="Profile" route={`profile/${username}`} />
                <MenuItemNavLink route="favorites" name="Favorites" />
                <MenuItemNavLink route="settings" name="Settings" />
                <Menu.Item onClick={signOut}>{fetching ? "Logging Out" : "Logout"}</Menu.Item>
              </>
            ) : (
              <>
                <MenuItemNavLink route="register" name="Register" />
                <MenuItemNavLink route="login" name="Login" />
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.End>
    </Navbar>
  );
}

const DropdownNavLink = ({ children, route }: { children: React.ReactNode; route: string }) => (
  <li>
    <NavLink end to={route}>
      {children}
    </NavLink>
  </li>
);

const MenuItemNavLink = (props: { name: string; route: string }) => (
  <Menu.Item>
    <NavLink end className={({ isActive }) => (isActive ? "menu-active " : "")} to={props.route}>
      {props.name}
    </NavLink>
  </Menu.Item>
);
