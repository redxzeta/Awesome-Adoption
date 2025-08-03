import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <PawHubContainer>
      <div className="my-8">
        <h1 className="font-amatic text-5xl font-bold mb-4">Adopting Pets</h1>
        <p>
          Adopting pets is a compassionate way to find your family&apos;s newest best friend. In the USA alone, around
          6.5 million companion pets enter shelters each year, including dogs and cats. Tragically, only about 3.2
          million of them find forever homes, while approximately 1.5 million are euthanized (Statistics provided by
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.aspca.org/animal-homelessness/shelter-intake-and-surrender/pet-statistics"
          >
            ASPCA
          </a>
          ).
        </p>
        <p className="font-bold">More information about adopting pets can be found at the links below:</p>
        <ul className="list-disc pl-8">
          <li>
            <a
              href="https://www.petfinder.com/pet-adoption-2/pet-adoption-information/"
              target="_blank"
              rel="noreferrer"
            >
              Pet Finder
            </a>
          </li>
          <li>
            <a href="https://www.humanesociety.org/resources/top-reasons-adopt-pet" target="_blank" rel="noreferrer">
              Humane Society
            </a>
          </li>
          <li>
            <a
              href="https://www.petcarehospital.net/blog/adopting-instead-of-buying-a-pet"
              target="_blank"
              rel="noreferrer"
            >
              Petcare Hospital
            </a>
          </li>
        </ul>
        <p className="font-bold">That leaves 1.8 million pets untouched, waiting for a loving home.</p>
        <p>
          By adopting a pet, you not only save a life but also benefit from cost savings compared to purchasing a pet.
          Many shelter pets are already house-trained and used to living with humans, making the transition easier for
          both of you.
        </p>
        <p>
          Moreover, adopting a pet brings immense joy and companionship to your life. Studies have shown that pets can
          reduce stress and promote emotional well-being. They are loyal friends who will always be by your side,
          providing unconditional love and support.
        </p>
        <div className="flex justify-center mt-4">
          <a
            href="https://www.petfinder.com/pet-adoption-2/pet-adoption-information/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mx-4"
          >
            Pet Finder
          </a>
          <a
            href="https://www.humanesociety.org/resources/top-reasons-adopt-pet"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mx-4"
          >
            Humane Society
          </a>
          <a
            href="https://www.petcarehospital.net/blog/adopting-instead-of-buying-a-pet"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Petcare Hospital
          </a>
        </div>
      </div>
      <hr />
      <div className="my-8">
        <h1 className="font-amatic text-5xl font-bold mb-4">Covid-19</h1>
        <p>
          Covid-19 is a newly found infectious disease that belongs to the Coronavirus family. The virus causes
          respiratory infections, with severity ranging from mild to life-threatening, depending on various factors. The
          World Health Organization has declared Covid-19 a pandemic, leading many countries to issue stay-at-home
          orders or recommendations for quarantine and self-isolation.
        </p>
        <p>
          Given the difficulties of staying home alone,
          <a
            href="https://apnews.com/article/31e3e60e7ea6bc4566b0ee3998ab98a6"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mx-4"
          >
            many people have chosen to adopt a furry companion
          </a>
          .
        </p>
        <p className="font-bold">
          Pawternity Hub aims to help you stay safe and find a loyal friend to keep you company during the pandemic.
          Check out the links below for more information about adopting during Covid-19:
        </p>
        <ul className="list-disc pl-8">
          <li>
            <a
              href="https://www.petfinder.com/helping-pets/covid-19-resources/how-to-adopt-a-pet-during-covid-19/"
              target="_blank"
              rel="noreferrer"
            >
              Pet Finder (Adopting during Covid-19)
            </a>
          </li>
          <li>
            <a
              href="https://www.oie.int/scientific-expertise/specific-information-and-recommendations/questions-and-answers-on-2019novel-coronavirus/"
              target="_blank"
              rel="noreferrer"
            >
              World Organization for Animal Health
            </a>
          </li>
        </ul>
        <p>
          At Pawternity Hub, we prioritize the health and safety of our community. We encourage responsible pet adoption
          and provide resources to help you make an informed decision. Adopting a pet during Covid-19 can bring
          much-needed positivity and companionship into your life while helping a shelter pet find a loving home.
        </p>
        <div className="flex justify-center mt-4">
          <a
            href="https://www.petfinder.com/helping-pets/covid-19-resources/how-to-adopt-a-pet-during-covid-19/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mx-4"
          >
            Pet Finder (Adopting during Covid-19)
          </a>
          <a
            href="https://www.oie.int/scientific-expertise/specific-information-and-recommendations/questions-and-answers-on-2019novel-coronavirus/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            World Organization for Animal Health
          </a>
        </div>
      </div>
      <hr />
      <div className="flex justify-center mt-4">
        <h2 className="font-amatic text-4xl font-bold">Adopt a Buddy Today!</h2>
        <Link to="/pets" className="btn btn-primary ml-4">
          Adopt
        </Link>
      </div>
    </PawHubContainer>
  );
}
