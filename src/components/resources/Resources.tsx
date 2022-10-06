import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <PawHubContainer>
      <div className="my-8">
        <h1 className="font-amatic text-5xl font-bold mb-4">Adopting Pets</h1>
        <p>
          Adopting pets is a much more humane way to find your family&apos;s
          newest best friend. Every year around 6.5 million companion pets enter
          shelte rs in just the USA, and that&apos;s only dogs and cats. Out of
          those
          <span> 6.5 million</span>, only <span>3.2 million</span> are adopted
          and
          <span> 1.5 million</span> are euthanized (Statistics provided by
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.aspca.org/animal-homelessness/shelter-intake-and-surrender/pet-statistics"
          >
            {""} ASPCA
          </a>
          ).
        </p>
        <p className="resource__paragraph-bold">
          More information about adopting pets can be found at the links below.
        </p>
        <p className="resource__paragraph-bold">
          This leaves 1.8 million pets that go untouched each year.
        </p>
        <p>
          Adopting a pet is cheaper than buying a pet, and you also potentially
          save a life by doing so. Many shelter pets are already house-trained
          and are used to living with humans.{" "}
        </p>{" "}
        <a
          href="https://www.petfinder.com/pet-adoption-2/pet-adoption-information/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary mx-4 "
        >
          Pet Finder
        </a>
        <a
          href="https://www.humanesociety.org/resources/top-reasons-adopt-pet"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary mx-4 "
        >
          Humane Society
        </a>
        <a
          href="https://www.petcarehospital.net/blog/adopting-instead-of-buying-a-pet"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary "
        >
          Petcare Hospital
        </a>
      </div>
      <hr />
      {/* ------------------------------------------------- */}
      <div>
        <h1 className="font-amatic text-5xl font-bold mb-4">Covid-19</h1>
        <p>
          Covid-19 is a newly found infectious disease that belongs to the
          Coronavirus family. The virus causes a respiratory infection which to
          some people is a minor problem, but to others could be very deadly
          depending on many different factors. The World Health Organization has
          announced that Covid-19 is considered a pandemic. Many countries have
          issued stay-at-home orders or recommendations to quarantine and self
          isolate.
        </p>
        <p>
          Because people find it hard to stay at home alone,
          <a
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mx-4 "
            href="https://apnews.com/article/31e3e60e7ea6bc4566b0ee3998ab98a6"
          >
            {" "}
            a lot of people decided to adopt a friend
          </a>
          .
        </p>
        <p className="resource__paragraph-bold">
          Pawternity Hub wants to help you stay safe and help you find a friend
          that can keep you company during the pandemic. Check out the links
          below for more information about adoption during Covid-19.
        </p>
        <a
          href="https://www.petfinder.com/helping-pets/covid-19-resources/how-to-adopt-a-pet-during-covid-19/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary mx-4 "
        >
          Pet Finder (Adopting during Covid-19)
        </a>
        <a
          href="https://www.oie.int/scientific-expertise/specific-information-and-recommendations/questions-and-answers-on-2019novel-coronavirus/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary "
        >
          World Organization for Animal Health
        </a>
      </div>
      <hr />
      <div>
        <h2>Adopt a Buddy Today!</h2>
        <Link to="/pets" className="btn btn-primary mx-4">
          Adopt
        </Link>
      </div>
    </PawHubContainer>
  );
}
