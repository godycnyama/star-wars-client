import React from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<KeyboardBackspaceIcon />}
          style={{ marginLeft: 0, textTransform: "none" }}
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>
        <Paper>
          <div style={{ margin: 15 }}>
            <Typography variant="h6">Introduction</Typography>
            <Divider />
            <br />
            <p style={{ borderLeft: "25px solid #34545c", backgroundColor: "#A0AFB7", padding: "5px" }}>
              This Star Wars app provides a way to retrieve detailed information
              about characters of the Star Wars Universe. It lists all Star Wars
              characters and details of each individual character. One can
              search for a particular character using the character's name.
            </p>
            <br/>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default About;
