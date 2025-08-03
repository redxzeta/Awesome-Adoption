import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Link } from "react-router-dom";

import logo from "./NotFoundDog.svg";

export default function NotFound() {
  return (
    <PawHubContainer>
      <div className="flex h-[initial] flex-col md:flex-row w-full justify-center items-center lg:h-3/4">
        <div className="w-[90%] sm:w-[70%] lg:w-[55%]">
          <img className="w-full" src={logo} alt="page not found" />
        </div>
        <div className="w-[100%] py-0 px-1 sm:w-[60%] lg:w-[30%] sm:my-0 sm:mx-auto lg:relative lg:ml-[8vw] lg:mt-[50px]">
          <div className="mb-4 text-5xl font-bold font-amatic text-center">
            <h1>Ruh Roh! 404 Error</h1>
            <h4>Page Not Found</h4>
          </div>
          <p>The pets you&apos;re looking for are in another castle!</p>

          <p>You either found a broken link or the content you were looking for was removed. Sorry!</p>

          <p>Heres a couple of pages you might have been looking for:</p>
          <ul className="[&>li]:mb-1 pl-2 list-[circle] mt-4">
            <li>
              <Link to="/" className="btn btn-primary">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/pets" className="btn btn-primary">
                PETS
              </Link>
            </li>
            <li>
              <Link to="/resources" className="btn btn-primary">
                RESOURCES
              </Link>
            </li>
            <li>
              <Link to="/tips" className="btn btn-primary">
                TIPS
              </Link>
            </li>
            <li>
              <Link to="/donate" className="btn btn-primary">
                DONATE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </PawHubContainer>
  );
}
