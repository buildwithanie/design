"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = ["Home", "About", "Our Work", "Media Center", "Get Involved"];

const projects = [
  {
    title: "AI Health Equity Lab",
    tag: "Research",
    image: "/images/project-ai-lab.png",
    text: "Building responsible AI models that help researchers identify health gaps early and translate findings into local action.",
  },
  {
    title: "Community Evidence Hubs",
    tag: "Field work",
    image: "/images/project-community-equity.png",
    text: "Working with communities to define research priorities, collect meaningful evidence, and return insights people can use.",
  },
  {
    title: "Digital Research Partnerships",
    tag: "Training",
    image: "/images/project-training.png",
    text: "Equipping health teams, researchers, and partners with practical tools for ethical, data-informed health programs.",
  },
];

const values = [
  {
    title: "Innovation",
    marker: "AI",
    image: "/images/project-ai-lab.png",
    text: "We explore practical AI, technology, and forward-thinking research methods that respond to evolving health needs.",
  },
  {
    title: "Impact",
    marker: "IM",
    image: "/images/hero-health-research.png",
    text: "We focus on measurable change for communities facing immediate health challenges and long-term health goals.",
  },
  {
    title: "Sustainability",
    marker: "SU",
    image: "/images/project-training.png",
    text: "We design research initiatives with resource efficiency, environmental responsibility, and continuity in mind.",
  },
  {
    title: "Responsibility",
    marker: "RE",
    image: "/images/project-community-equity.png",
    text: "We work with accountability, ethical integrity, transparency, trust, and respect for every community involved.",
  },
  {
    title: "Empowerment",
    marker: "EM",
    image: "/images/project-training.png",
    text: "We equip communities, researchers, and stakeholders with the tools and opportunities to shape better health outcomes.",
  },
];

const stories = [
  "Responsible AI for public health decision-making",
  "Community-led research that strengthens local trust",
  "Partnership models for equitable health innovation",
];

const partners = [
  {
    name: "Health ministries",
    label: "Ministries",
    image: "/images/project-training.png",
    className: "partner-ministry",
  },
  {
    name: "Universities",
    label: "Universities",
    image: "/images/project-ai-lab.png",
    className: "partner-university",
  },
  {
    name: "Community health teams",
    label: "Communities",
    image: "/images/project-community-equity.png",
    className: "partner-community",
  },
  {
    name: "AI + data labs",
    label: "AI labs",
    image: "/images/iahl-media-meeting.png",
    className: "partner-labs",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="IAHL home" onClick={closeMenu}>
          <Image
            src="/images/iahl-logo.jpeg"
            alt="Innovate AI HealthLab logo"
            width={164}
            height={120}
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="main-nav desktop-only" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a className={index === 0 ? "active" : ""} href="#" key={item}>
              {item}
            </a>
          ))}
        </nav>

        {/* Hamburger Menu Toggle */}
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Mobile Navigation Drawer */}
        <div
          className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}
          onClick={closeMenu}
        >
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item, index) => (
              <a
                className={index === 0 ? "active" : ""}
                href="#"
                key={item}
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <Image
          src="/images/hero-community-ai-health.png"
          alt="Community members and a health research facilitator discussing data on a tablet"
          fill
          priority
          unoptimized
          className="hero-image"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">Innovate AI HealthLab</p>
          <h1>AI-powered health research, shaped by community.</h1>
          <p>
            We bring communities, researchers, and strategic partners together
            to design trustworthy AI solutions for equitable health outcomes.
          </p>

          <div className="hero-actions">
            <a href="#work" className="button button-primary">
              Explore Our Work
            </a>
            <a href="#involved" className="button button-ghost">
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      <section className="community-section">
        <div className="community-grid">
          <div className="community-copy">
            <div className="copy-photo-node copy-photo-top">
              <span>
                <Image
                  src="/images/project-training.png"
                  alt=""
                  fill
                  sizes="184px"
                />
              </span>
              <strong>Ministries</strong>
            </div>
            <p className="section-kicker">Where we begin</p>
            <h2>Africa-led health research.</h2>
            <p>
              People, evidence, and responsible AI working together for fairer
              health outcomes.
            </p>
            <div className="copy-photo-node copy-photo-bottom">
              <span>
                <Image
                  src="/images/project-community-equity.png"
                  alt=""
                  fill
                  sizes="196px"
                />
              </span>
              <strong>Community</strong>
            </div>
          </div>

          <div className="africa-showcase" aria-label="Africa-led health research visual">
            <div className="showcase-topline">
              <span />
              <strong>Continental Research Network</strong>
            </div>
            <div className="africa-photo-map" aria-hidden="true" />
            <div className="partner-nodes" aria-label="IAHL partner ecosystem">
              {partners.slice(1, 3).map((partner) => (
                <article
                  className={`partner-node ${partner.className}`}
                  key={partner.name}
                >
                  <span>
                    <Image
                      src={partner.image}
                      alt=""
                      fill
                      sizes="154px"
                    />
                  </span>
                  <strong>{partner.label}</strong>
                </article>
              ))}
            </div>
            <div className="showcase-words" aria-label="IAHL approach keywords">
              <span>People</span>
              <span>Evidence</span>
              <span>AI</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision">
        <article className="vision-card">
          <p>Our Vision</p>
          <h2>
            A future where health research promotes equity and equality at the
            community level.
          </h2>
        </article>
        <article className="mission-card">
          <p>Our Mission</p>
          <h2>
            To advance health research through AI, innovation, and strategic
            partnerships for equitable health outcomes.
          </h2>
        </article>
      </section>

      <section className="projects-section" id="work">
        <div className="section-heading inline-heading">
          <div>
            <p className="section-kicker">Projects</p>
            <h2>Focused work with measurable community value</h2>
          </div>
          <a href="#" className="small-link">
            View all
          </a>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <div className="project-body">
                <p>{project.tag}</p>
                <h3>{project.title}</h3>
                <span>{project.text}</span>
                <a href="#">Read more</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-statement">
        <div className="soft-blob" aria-hidden="true" />
        <div className="statement-rule" />
        <h2>
          We use responsible AI to help communities, researchers, and health
          systems act on evidence with confidence.
        </h2>
      </section>

      <section className="insights-band">
        <div className="insights-inner">
          <p className="section-kicker">Media Center</p>
          <h2>Latest thinking from IAHL</h2>
          <div className="story-grid">
            {stories.map((story, index) => (
              <article className="story-card" key={story}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{story}</h3>
                <a href="#">Read article</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section">
        <div className="approach-blob approach-blob-one" aria-hidden="true" />
        <div className="approach-blob approach-blob-two" aria-hidden="true" />
        <div className="approach-blob approach-blob-three" aria-hidden="true" />
        <div className="section-heading">
          <p className="section-kicker">Our Approach</p>
          <h2>Five values that shape every research partnership</h2>
        </div>
        <div className="approach-map">
          {values.map((value, index) => (
            <article
              className={`approach-item ${index % 2 === 1 ? "is-reverse" : ""}`}
              key={value.title}
            >
              <div className="approach-photo">
                <Image
                  src={value.image}
                  alt=""
                  fill
                  sizes="150px"
                />
              </div>
              <div className="approach-pin" aria-hidden="true">
                {value.marker}
              </div>
              <div className="approach-copy">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="get-involved" id="involved">
        <div className="involved-heading">
          <p className="section-kicker">Get involved</p>
          <h2>Partner with us</h2>
          <p className="involved-subtitle">
            Let us advance AI-powered health research with communities at the center.
          </p>
        </div>
        <div className="involved-media">
          <Image
            src="/images/iahl-media-meeting.png"
            alt="IAHL partners in a meeting discussing AI health research"
            width={2048}
            height={1024}
            sizes="(max-width: 900px) 100vw, 68vw"
            className="involved-image"
          />
        </div>
      </section>

      <section className="work-with-us">
        <div className="section-heading">
          <p className="section-kicker">Work With Us</p>
          <h2>Build a more equitable health future</h2>
        </div>
        <div className="work-grid">
          <article>
            <h3>Careers</h3>
            <p>
              Join a team blending AI, research, and community-centered health
              innovation.
            </p>
            <a href="#">Open roles</a>
          </article>
          <article>
            <h3>Partner with IAHL</h3>
            <p>
              Collaborate on research, training, digital health pilots, and
              strategic programs.
            </p>
            <a href="#">Partnerships</a>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <Image
            src="/images/iahl-logo.jpeg"
            alt="Innovate AI HealthLab logo"
            width={128}
            height={94}
          />
          <p>
            Advancing health research through AI, innovation, and strategic
            partnerships for equitable health outcomes.
          </p>
        </div>
        <div className="footer-columns">
          <div>
            <h3>Explore</h3>
            <a href="#">About</a>
            <a href="#">Our work</a>
            <a href="#">Media center</a>
          </div>
          <div>
            <h3>Connect</h3>
            <a href="#">Partnerships</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <form className="newsletter">
            <h3>Stay updated via email</h3>
            <label htmlFor="email">Email address</label>
            <div>
              <input id="email" type="email" placeholder="you@example.com" />
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </footer>
    </main>
  );
}
