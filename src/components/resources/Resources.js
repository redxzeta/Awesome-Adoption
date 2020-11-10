import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./resources.css";
export default function Home() {
  return (
    <div className="resources__container">
      <h1>Adopting Pets</h1>
      <p>
        Adopting pets is a much more humane way to find your familys newest best friend. Every year around 6.5 million companion pets enter shelters in just the USA, and thats only dogs and cats.
        Out of those <b>6.5 million</b>, only <b>3.2 million</b> are adopted and <b>1.5 million</b> are euthanized (Statistics provided by <a href="https://www.aspca.org/animal-homelessness/shelter-intake-and-surrender/pet-statistics">ASPCA</a>).
        <br/><b>This leaves 1.8 million pets that go untouched each year.</b><br/><br/>
        Adopting a pet is cheaper than buying a pet, and you also potentially save a life by doing so. Many shelter pets are already house-trained and are used to living with humans.<br/><br/>
        <b>More information about adopting pets can be found at the links below</b><br/>
        <Button href="https://www.petfinder.com/pet-adoption-2/pet-adoption-information/" variant="primary">
            Pet Finder
        </Button>
        <Button href="https://www.humanesociety.org/resources/top-reasons-adopt-pet" variant="primary">
            Humane Society
        </Button>
        <Button href="https://www.petcarehospital.net/blog/adopting-instead-of-buying-a-pet" variant="primary">
            Petcare Hospital
        </Button>
      </p>
      <br/>
      <h1>Covid-19</h1>
      <p>
        Covid-19 is a newly found infectious disease that belongs to the Coronavirus family. The virus causes a respiratory infection which to some people is a minor problem, but to others could be
        very deadly depending on many different factors. The World Health Organization has annouced that Covid-19 is considered a pandemic. Many countries have issued stay at home orders or recommendations to quarantine and self isolate.
        <br/><br/>
        Because people find it hard to stay at home alone, <a href="https://apnews.com/article/31e3e60e7ea6bc4566b0ee3998ab98a6">a lot of people decided to adopt a friend</a>.
        <br/><br/>
        <b>Pawternity Hub wants to help you stay safe and help you find a friend that can keep you company during the pandemic<br/> Check out the links below for more information about adoption during Covid-19</b>
        <br/>
        <Button href="https://www.petfinder.com/helping-pets/covid-19-resources/how-to-adopt-a-pet-during-covid-19/" variant="primary">
            Pet Finder (Adopting during Covid-19)
        </Button>
        <Button href="https://www.oie.int/scientific-expertise/specific-information-and-recommendations/questions-and-answers-on-2019novel-coronavirus/" variant="primary">
            World Organization for Animal Health
        </Button>
      </p>
      <br/>
      <h2>Adopt a Buddy Today!</h2>
      <Button as={Link} to="/pets" variant="primary">
        Adopt
      </Button>
    </div>
  );
}
