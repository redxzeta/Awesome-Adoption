import { ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Navbar } from "react-daisyui";
import { NavLink } from "react-router-dom";

const petList = ["Dog", "Cat", "Rabbit", "Horse", "Bird"];
export default function NavigationBar() {
  return (
    <nav className="bg-base-100">
      <Navbar color="primary" className="text-neutral container mx-auto  ">
        <Navbar.Start className="px-2">
          <span className="text-lg font-bold">Pawternity Hub</span>
        </Navbar.Start>

        <Navbar.End className="px-2 mx-2 ">
          <Menu horizontal>
            {" "}
            <Menu.Item />
            <MenuItemNavLink route="/" name="Home" />
            <Menu.Item>
              <label tabIndex={0} className={"rounded-box"}>
                Pets <ChevronDownIcon className="w-5" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow  rounded-box w-52 z-40 bg-base-100 border-2 border-neutral"
              >
                {petList.map((pet) => (
                  <ListNavLink
                    key={pet}
                    name={pet}
                    route={`pets/${pet.toLocaleLowerCase()}`}
                  />
                ))}
                <li className="border-t-2 border-accent ">
                  {" "}
                  <NavLink
                    className={({ isActive }) => (isActive ? "active " : "")}
                    to="pets"
                    end
                  >
                    All Pets
                  </NavLink>
                </li>
              </ul>
            </Menu.Item>
            <MenuItemNavLink name="About" route="about" />
            <MenuItemNavLink route="resources" name="Resources" />
            <MenuItemNavLink route="organizations" name="Organizations" />{" "}
            <Menu.Item />
          </Menu>
        </Navbar.End>
      </Navbar>
    </nav>
  );
}

const ListNavLink = (props: { name: string; route: string }) => (
  <li>
    <NavLink
      className={({ isActive }) => (isActive ? "active " : "")}
      to={props.route}
    >
      {props.name}
    </NavLink>
  </li>
);
const MenuItemNavLink = (props: { name: string; route: string }) => (
  <Menu.Item>
    <NavLink
      className={({ isActive }) =>
        isActive ? "active rounded-box" : "rounded-box"
      }
      to={props.route}
    >
      {props.name}
    </NavLink>
  </Menu.Item>
);
