import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "context/SupaContext";
import React from "react";
import { Avatar, Button, Dropdown, Menu, Navbar } from "react-daisyui";
import { Link, NavLink } from "react-router-dom";
import { useSignOut } from "react-supabase";

import ThemeToggle from "../themeToggle/themeToggle";
import PawLogo from "./PawLogo.png";

const petList = ["Dog", "Cat", "Rabbit", "Horse", "Bird"];
export default function NavigationBar() {
  const { username, session } = useAuth();
  const [{ fetching }, signOut] = useSignOut();

  return (
    <nav className="bg-base-100 z-50">
      <Navbar className="container mx-auto">
        <Navbar.Start>
          <Dropdown>
            <Button color="ghost" tabIndex={0} className="lg:hidden">
              <Bars3BottomLeftIcon className="w-5 h-5" />
            </Button>
            <Dropdown.Menu className="w-52 menu-compact mt-3 ">
              <DropdownNavLink route="/">Home</DropdownNavLink>
              <li tabIndex={0}>
                <a className="justify-between">
                  Pets <ChevronRightIcon className="w-4" />
                </a>
                <ul className="p-2 bg-base-100">
                  {petList.map((pet) => (
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
        <Navbar.Center className="hidden lg:flex justify-center">
          <Menu horizontal className="p-0 ">
            <MenuItemNavLink name="Home" route="/" />
            <Menu.Item tabIndex={0} className="mx-1">
              <a>
                Pets <ChevronDownIcon className="w-4" />
              </a>
              <Menu className="p-2 bg-base-200 w-48 z-50">
                {petList.map((pet) => (
                  <MenuItemNavLink
                    key={pet}
                    name={pet}
                    route={`/pets/${pet.toLowerCase()}`}
                  />
                ))}
                <MenuItemNavLink name="All Pets" route="pets" />
              </Menu>
            </Menu.Item>
            <MenuItemNavLink name="About" route="about" />
            <MenuItemNavLink name="Resources" route="resources" />
            <MenuItemNavLink name="Organizations" route="organizations" />
            <MenuItemNavLink name="Contact" route="contact" />
          </Menu>
        </Navbar.Center>
        <Navbar.End>
          <ThemeToggle />
          <Dropdown vertical="end">
            <Avatar
              src={PawLogo}
              size="xs"
              className="btn btn-primary btn-circle my-auto "
            />

            <Dropdown.Menu className="w-52 menu-compact">
              <Dropdown.Item>{`Hello, ${username}`}</Dropdown.Item>
              {session ? (
                <>
                  <DropdownNavLink route={`profile/${username}`}>
                    Profile
                  </DropdownNavLink>
                  <DropdownNavLink route="favorites">Favorites</DropdownNavLink>
                  <DropdownNavLink route="settings">Settings</DropdownNavLink>

                  <Dropdown.Item onClick={signOut}>
                    {fetching ? "Logging Out" : "Logout"}
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <DropdownNavLink route="register">Register</DropdownNavLink>
                  <DropdownNavLink route="login">Login</DropdownNavLink>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.End>
      </Navbar>
    </nav>
  );
}

const DropdownNavLink = ({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) => (
  <li>
    <NavLink end to={route}>
      {children}
    </NavLink>
  </li>
);

const MenuItemNavLink = (props: { name: string; route: string }) => (
  <Menu.Item>
    <NavLink
      end
      className={({ isActive }) => (isActive ? "active " : "")}
      to={props.route}
    >
      {props.name}
    </NavLink>
  </Menu.Item>
);
