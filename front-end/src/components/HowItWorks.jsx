import React from "react";
import { Container } from "react-bootstrap";

const HowItWorks = () => {
  return (
    <Container className="my-5" style={{ textAlign: "justify" }}>
      <h1 className="text-center">
        PlanMe: Web Application for Family Management 🏡📆
      </h1>

      <p className="m-3">
        Welcome to PlanMe, an innovative web application designed to simplify
        the daily management of families and groups living together. Connect the
        app to your favorite physical device, like a digital board strategically
        placed in the kitchen or a shared space. This app aims to bring together
        various applications, WhatsApp groups, sticky notes, to make household
        management more fluid and efficient.
      </p>

      <h2>Key Features 🚀</h2>

      <ul className="m-3">
        <li>
          <strong>Shared Calendar:</strong> Create and manage events
          collaboratively.
        </li>
        <li>
          <strong>Customization to Your Liking:</strong> Configure your planner
          according to your needs, choosing what to display on the main screen.
        </li>
      </ul>

      <p>Examples include:</p>

      <ul className="m-3">
        <li>
          <strong>Shared Shopping List:</strong> Easily add, edit, and share
          items. The list will always be up to date on both your personal and
          shared devices.
        </li>
        <li>
          <strong>Cleaning Shifts:</strong> Living with others and need to
          organize shifts? Forget when it's your turn? This feature has you
          covered.
        </li>
        <li>Home Repair/Task List</li>
        <li>Children's Commitments</li>
        <li>
          <strong>IKEA List:</strong> If you visit IKEA infrequently and need to
          keep track of things you need, write and update the list.
        </li>
        <li>
          <strong>Let your imagination run wild</strong>
        </li>
      </ul>

      <h2 className="text-center mt-3">FUNCTIONALITY:</h2>

      <h3>Registration and Login 📝🔒</h3>

      <p className="m-3">
        Users can register by providing some information: username, email,
        password... Access is equally easy via Google account. Alternatively,
        they can log in with previously created credentials.
      </p>

      <h3>Login Screen 🖥️🔑</h3>

      <p className="m-3">Upon login, users will find two clear options:</p>

      <ul className="m-3">
        <li>
          <strong>A. Create a New Planner:</strong> To start from scratch and
          customize their management tool. A unique token will be assigned to
          the newly created Planner for sharing purposes.
        </li>
        <li>
          <strong>B. Join an Existing Planner:</strong> To participate in an
          already active planner by entering the email address and the
          associated unique token.
        </li>
      </ul>

      <h3>Planner Configuration (Option A) ⚙️🎨</h3>

      <p className="m-3">
        For new planners, customize the name and background color. You have two
        options:
      </p>

      <ol className="m-3">
        <li>
          <strong>Show Some Examples:</strong> For a visual guide.
        </li>
        <li>
          <strong>Select What to Display:</strong> For even more in-depth
          customization (calendar, shopping list, appointments, notes, etc.).
        </li>
      </ol>

      <h3>Planner Screen 📊📌</h3>

      <p className="m-3">
        Once configured, your planner is ready to use. Manage different input
        types:
      </p>

      <ul className="m-3">
        <li>
          <strong>Text:</strong> For shopping, appointments, notes, to-dos, and
          more.
        </li>
        <li>
          <strong>Calendar:</strong> View scheduled events.
        </li>
      </ul>

      {/*   <!-- The planner is customizable, so you can also choose to see:
  - **Images:** Share important photos or images.
  - **Quote of the Day:** An aphorism generator will show you daily quotes on your dashboard. -->

  <!-- <h3>Input Details 🖋️🔄</h3>

  <p>Further customize inputs by changing fonts and organize them easily using drag and drop.</p> --> */}

      <h3>Get Started Now 🚀</h3>

      <p className="m-3">
        PlanMe offers an intuitive, fun, and collaborative way to organize daily
        life with your family or housemates. Register your account, set up your
        planner, and simplify household management like never before! 🏡💙
      </p>
    </Container>
  );
};

export default HowItWorks;
