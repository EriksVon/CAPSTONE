import React from "react";
import usImg from "./../styles/images/aboutUs.png";
import { Container, Image } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container className="my-5" style={{ textAlign: "justify" }}>
      <Image fluid src={usImg} alt="Team" rounded />
      <p className="m-3">
        <strong>👋 Hi there!</strong>
        <br />
        We are Erica & Chiara, two sisters with unique perspectives and a shared
        passion for creating something meaningful.
      </p>
      <p className="m-3">
        Our journey led us to collaborate on a project that combines our diverse
        skills, creativity, and complementary strengths. We believe that
        bringing together different backgrounds and approaches enriches the
        creative process and leads to innovative solutions. 🚀
      </p>

      <p className="m-3">
        <strong>Meet the Team:</strong>
        <br />
        <strong>👩‍💻 Erica:</strong> I'm a full-stack developer, creative thinker,
        and always looking for new challenges. I'm passionate about creating
        innovative solutions and learning new technologies. 🌐
        <br />
        <strong>👩‍⚕️ Chiara:</strong> I'm an obstetrician, passionate about my
        job. I'm always looking for new ways to improve my work and my life. I'm
        the mother of one amazing child. 👶
      </p>
    </Container>
  );
};

export default AboutUs;
