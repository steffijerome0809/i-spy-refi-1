import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import { auth } from "../firebase";
import "../App.css";
import { Container, Row, Button, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';

function Home(props) {
  
  const { isAuth, logout } = useContext(AuthContext);

  return (
    <Container className="signup">
      <Grid container spacing={10} style={{ padding: 24 }}>
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  House
                </Grid>
              
            </Grid>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Home Page</h1>
          {isAuth ? (
            <>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </Button>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/houses");
                }}
              >
                Houses
              </Button>
            </>
          ) : (
            <>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/signup");
                }}
              >
                Signup
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
