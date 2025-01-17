import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [sinopsisVisible, setSinopsisVisible] = useState(null); // Estado para rastrear qué sinopsis mostrar

  useEffect(() => {
    const fetchPeliculas = async () => {
      const response = await fetch("/peliculas.json");
      const data = await response.json();
      setPeliculas(data);
      setPeliculaSeleccionada(data[0]);
    };
    fetchPeliculas();
  }, []);

  const toggleSinopsis = (index) => {
    setSinopsisVisible((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      <header className="text-center py-4">
        <h1>Cartelera</h1>
      </header>
      <Container>
        {peliculaSeleccionada && (
          <>
            <Row className="my-4">
              <Col md={8}>
                <img src={peliculaSeleccionada.foto} alt={peliculaSeleccionada.titulo} className="img-fluid"/>
              </Col>
              <Col md={4}>
                <h2>{peliculaSeleccionada.titulo}</h2>
                <p><strong>Director:</strong> {peliculaSeleccionada.director}</p>
                <p><strong>Actores:</strong> {peliculaSeleccionada.actoresPrincipales.join(", ")}</p>
                <p><strong>Sinopsis:</strong> {peliculaSeleccionada.sinopsis}</p>
              </Col>
            </Row>
          </>
        )}

        <Row>
          {peliculas.map((movie, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card bg="dark" text="white">
                <Card.Img variant="top" src={movie.foto} />
                <Card.Body>
                  <Card.Title>{movie.titulo}</Card.Title> <Button variant="primary" onClick={() => toggleSinopsis(index)}>
                    {sinopsisVisible === index ? "Ocultar" : "Más"}
                  </Button>{" "}
                  <Button variant="success" onClick={() => setPeliculaSeleccionada(movie)}>
                    Seleccionar
                  </Button>
                  {sinopsisVisible === index && (
                    <div className="p-3 bg-light text-dark border mt-3">
                      <h5>Sinopsis:</h5>
                      <p>{movie.sinopsis}</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;