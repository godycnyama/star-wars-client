import React from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../state/stateHooks";
import { personSelector } from "../../state/peopleState/personSlice";

const PersonDetail = () => {
  const history = useHistory();
  const { person } = useAppSelector(personSelector);

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
            <Typography variant="h6">Star Wars Character Detail</Typography>
            <Divider />
            <br />
            <div
              style={{
                borderLeft: "25px solid #34545c",
                backgroundColor: "#A0AFB7",
                padding: "5px",
              }}
            >
              <p>
                <b>Name:</b> {person.name}
              </p>
              <p>
                <b>Height:</b> {person.height}
              </p>
              <p>
                <b>Mass:</b> {person.mass}
              </p>
              <p>
                <b>Gender:</b> {person.gender}
              </p>
              <p>
                <b>Home World:</b> {person.homeworld}
              </p>
            </div>
          </div>
          <br />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PersonDetail;
