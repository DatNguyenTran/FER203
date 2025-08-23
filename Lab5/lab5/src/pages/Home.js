import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: "🍕",
      title: "Fresh Ingredients",
      description:
        "We use only the finest and freshest ingredients in all our dishes.",
      color: "primary",
      link: "/products",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery to your doorstep within 30 minutes.",
      color: "success",
      link: "/products",
    },
    {
      icon: "⭐",
      title: "Best Quality",
      description:
        "Highest quality standards maintained in every dish we serve.",
      color: "warning",
      link: "/products",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Delicious Dishes" },
    { number: "30min", label: "Delivery Time" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <Carousel />

      {/* Welcome Section */}
      <section className="welcome-section py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <div className="welcome-content">
                <h1 className="welcome-title mb-4">
                  Welcome to <span className="text-gradient">FoodApp</span>
                </h1>
                <p className="welcome-subtitle mb-4">
                  Discover delicious meals and amazing flavors from around the
                  world. Experience culinary excellence with every bite.
                </p>
                <div className="welcome-buttons">
                  <Button
                    as={Link}
                    to="/products"
                    variant="primary"
                    size="lg"
                    className="me-3"
                  >
                    🛍️ Explore Menu
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="outline-primary"
                    size="lg"
                  >
                    📝 Join Now
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="section-title mb-3">Why Choose Us?</h2>
              <p className="section-subtitle">
                We're committed to delivering the best dining experience
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col
                lg={4}
                md={6}
                key={index}
              >
                <Card className={`feature-card h-100 ${isDark ? "dark" : ""}`}>
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span className="icon-emoji">{feature.icon}</span>
                    </div>
                    <Card.Title className="feature-title mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="feature-description mb-4">
                      {feature.description}
                    </Card.Text>
                    <Button
                      as={Link}
                      to={feature.link}
                      variant={`outline-${feature.color}`}
                      className="feature-button"
                    >
                      Learn More →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col
                lg={3}
                md={6}
                key={index}
              >
                <div className="stat-card text-center">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col
              lg={8}
              className="text-center"
            >
              <div className="cta-content">
                <h2 className="cta-title mb-4">
                  Ready to Experience Amazing Food?
                </h2>
                <p className="cta-description mb-4">
                  Join thousands of satisfied customers and discover your new
                  favorite dishes today!
                </p>
                <div className="cta-buttons">
                  <Button
                    as={Link}
                    to="/products"
                    variant="primary"
                    size="lg"
                    className="me-3"
                  >
                    🍽️ Order Now
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="outline-light"
                    size="lg"
                  >
                    🚀 Get Started
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
