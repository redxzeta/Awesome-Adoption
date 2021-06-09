import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./resources.css";
export default function Home() {
  return (
    <div className="resources__container">
      <h1>Adopting Pets</h1>
      <p>
        Adopting pets is a much more humane way to find your familys newest best
        friend. Every year around 6.5 million companion pets enter shelters in
        just the USA, and thats only dogs and cats. Out of those
        <span> 6.5 million</span>, only <span>3.2 million</span> are adopted and
        <span> 1.5 million</span> are euthanized (Statistics provided by
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.aspca.org/animal-homelessness/shelter-intake-and-surrender/pet-statistics"
        >
          {""} ASPCA
        </a>
        ).
        <p>
          <span>This leaves 1.8 million pets that go untouched each year.</span>
        </p>
        <p>
          Adopting a pet is cheaper than buying a pet, and you also potentially
          save a life by doing so. Many shelter pets are already house-trained
          and are used to living with humans.{" "}
        </p>{" "}
        <p>
          <span>
            More information about adopting pets can be found at the links below
          </span>
        </p>
      </p>
      <Button
        href="https://www.petfinder.com/pet-adoption-2/pet-adoption-information/"
        target="_blank"
        variant="primary"
      >
        Pet Finder
      </Button>
      <Button
        href="https://www.humanesociety.org/resources/top-reasons-adopt-pet"
        target="_blank"
        variant="primary"
      >
        Humane Society
      </Button>
      <Button
        href="https://www.petcarehospital.net/blog/adopting-instead-of-buying-a-pet"
        target="_blank"
        variant="primary"
      >
        Petcare Hospital
      </Button>
      <h1>Covid-19</h1>
      <p>
        Covid-19 is a newly found infectious disease that belongs to the
        Coronavirus family. The virus causes a respiratory infection which to
        some people is a minor problem, but to others could be very deadly
        depending on many different factors. The World Health Organization has
        annouced that Covid-19 is considered a pandemic. Many countries have
        issued stay at home orders or recommendations to quarantine and self
        isolate.
      </p>
      <p>
        Because people find it hard to stay at home alone,
        <a
          target="_blank"
          rel="noreferrer"
          href="https://apnews.com/article/31e3e60e7ea6bc4566b0ee3998ab98a6"
        >
          {" "}
          a lot of people decided to adopt a friend
        </a>
        .
      </p>
      <p>
        <span>
          Pawternity Hub wants to help you stay safe and help you find a friend
          that can keep you company during the pandemic
          <p>
            Check out the links below for more information about adoption during
            Covid-19
          </p>
        </span>
      </p>{" "}
      <Button
        href="https://www.petfinder.com/helping-pets/covid-19-resources/how-to-adopt-a-pet-during-covid-19/"
        target="_blank"
        variant="primary"
      >
        Pet Finder (Adopting during Covid-19)
      </Button>
      <Button
        href="https://www.oie.int/scientific-expertise/specific-information-and-recommendations/questions-and-answers-on-2019novel-coronavirus/"
        target="_blank"
        variant="primary"
      >
        World Organization for Animal Health
      </Button>
      <h2>Adopt a Buddy Today!</h2>
      <Button as={Link} to="/pets" variant="primary">
        Adopt
      </Button>
    </div>
  );
}
