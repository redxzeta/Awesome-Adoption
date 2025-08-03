import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Link } from "react-router-dom";

import AdoptionPet from "./adoption-pet.jpg";

export default function Tips() {
  return (
    <PawHubContainer>
      <div className=" ">
        <h1 className="text-5xl font-bold font-amatic mb-10">Tips to adopting Pets</h1>
        <p>
          <span>Lifestyle & Flexibility: </span>What is your current lifestyle like? What changes are you willing to
          make to adapt to your new life with a dog? Which changes are you not willing to make?
        </p>
        <p>
          <span>Activity level: </span>
          Activity level can vary widely between individual dogs and dog breeds. Know how much activity your pup will
          need before you take the plunge.
        </p>{" "}
        <p>
          <span>Loved Ones: </span>
          How will those around you be impacted by the new addition?Consider small children, older relatives and those
          with allergies.
        </p>{" "}
        <p>
          <span>Physical Maintenance: </span>
          Different dogs require different levels of grooming and physical care. How much time are you willing to
          invest?
        </p>{" "}
      </div>
      <hr />
      {/* ------------------------------------------------- */}
      <div className="text-center mt-8">
        <h1 className="mb-4">Final steps to guide you on how to best adopt or rehome a dog</h1>
        <p>
          <ul>
            <li>Review your new dog&apos;s history, background & special needs</li>
            <li>
              Choose
              <a rel="noreferrer" href="/pets">
                {""} your future
              </a>
            </li>
            <li>Find a vet</li>
            <li>Dog-proof your house</li>
            <li>
              Make a plan of action for
              <a
                target="_blank"
                rel="noreferrer"
                href="https://tractive.com/blog/en/good-to-know/introducing-dogs-to-each-other?utm_medium=link&utm_source=blog&utm_campaign=introducing-dogs"
              >
                {""} introducing the new dog to your current pets
              </a>
            </li>
          </ul>
        </p>
        <p>
          Because people find it hard to stay at home alone,
          <a target="_blank" rel="noreferrer" href="https://apnews.com/article/31e3e60e7ea6bc4566b0ee3998ab98a6">
            {" "}
            a lot of people decided to adopt a friend
          </a>
          .
        </p>
        <p className="font-bold">
          Pawternity Hub wants to help you stay safe and help you find a friend that can keep you company during the
          pandemic. Check out the links below for more information about adoption during Covid-19.
        </p>
      </div>
      <hr />
      <div className="text-center mt-8">
        <h5>
          When you finally get your new pup home, be the best dog owner you can be! Have fun with your dog, love your
          dog, and include him in your life. Be sure to familiarize yourself with the laws regarding dogs where you
          live. Teach your dog basic commands and good manners, equip him with a GPS tracker for safety, and make sure
          he gets daily training in order to be a responsible member of your family. With a little bit of thorough
          preparation, you can have your own success story when you adopt a dog.
        </h5>
        <img src={AdoptionPet} className="w-[350px] lg:w-[50%] rounded-[2%] mb-2 d-block mx-auto " alt="Adoption pet" />

        <Link to="/pets" className="btn btn-primary">
          Adopt
        </Link>
      </div>
    </PawHubContainer>
  );
}
