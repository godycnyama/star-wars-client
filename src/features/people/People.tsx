import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import ListIcon from "@material-ui/icons/List";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LockIcon from "@material-ui/icons/Lock";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../state/stateHooks";
import { openToast } from "../../common/Toast";
import Busy from "../../common/Busy";
import { Person } from "../../models/person";
import { setPerson } from "../../state/peopleState/personSlice";
import {
  setSearchBy,
  setSearchTerm,
  setTotal,
  setNumberOfPages,
  setPageSize,
  setCurrentPage,
  setNextPage,
  setPreviousPage,
  getPeopleSuccess,
  peopleSelector,
} from "../../state/peopleState/peopleSlice";

// search form inputs
interface SearchParams {
  searchBy: string;
  characterName: string;
}

//search form validation
const validationSchema = Yup.object().shape({
  searchBy: Yup.string().required("Required"),
  characterName: Yup.string(),
});

//get Star Wars characters/people query
const GET_PEOPLE = gql`
  query($page: Float!) {
    getPeople(page: $page) {
      count
      next
      previous
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

//get Star Wars character/person query
const GET_PERSON = gql`
  query($name: String!) {
    getPerson(name: $name) {
      count
      next
      previous
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

const searchByOptions = ["All", "Name"];

const People = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    people,
    searchStateParameters: {
      searchBy,
      searchTerm,
      currentPage,
      total,
      numberOfPages,
      previousPage,
      nextPage
    },
  } = useAppSelector(peopleSelector);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    control,
    watch,
  } = useForm<SearchParams>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      searchBy: searchBy,
      characterName: searchTerm,
    },
  });

  const watchSearchBy = watch("searchBy");

  //get people query
  const [getPeople, { loading: getPeopleLoading }] = useLazyQuery(GET_PEOPLE, {
    onCompleted: (data) => {
      if (data.getPeople.results.length === 0) {
        openToast("error", "No characters found!");
        return;
      }
      dispatch(setTotal(data.getPeople.count));
      dispatch(setNumberOfPages(Math.ceil(data.getPeople.count / 10)));

      if (data.getPeople.next !== null) {
        let nextPageArray: string[] = data.getPeople.next.split("=");
        let nextPage: string = nextPageArray[nextPageArray.length - 1];
        dispatch(setNextPage(parseInt(nextPage)));
      }

      if (data.getPeople.next === null) {
        dispatch(setNextPage(undefined));
      }

      if (data.getPeople.previous !== null) {
        let previousPageArray: string[] = data.getPeople.previous.split("=");
        let previousPage: string =
          previousPageArray[previousPageArray.length - 1];
        dispatch(setPreviousPage(parseInt(previousPage)));
      }

      if (data.getPeople.previous === null) {
        dispatch(setPreviousPage(undefined));
      }

      dispatch(getPeopleSuccess(data.getPeople.results));
    },
    onError: (error: any) => {
      openToast("error", error.networkError.result.errors[0].message);
    },
  });

  //get person query given name
  const [getPerson, { loading: getPersonLoading }] = useLazyQuery(GET_PERSON, {
    onCompleted: (data) => {
      if (data.getPerson.results.length === 0) {
        openToast("error", "No character found!");
        return;
      }

      dispatch(getPeopleSuccess(data.getPerson.results));
    },
    onError: (error: any) => {
      console.log(error);
      openToast("error", error.networkError.result.errors[0].message);
    },
  });

  const viewPerson = (person: Person): void => {
    dispatch(setPerson(person));
    history.push("/person-detail");
  };

  const searchPeople = (): void => {
    getPeople({
      variables: {
        page: currentPage,
      },
    });
  };

  const searchPerson = (name: string): void => {
    if (name === "") {
      openToast("error", "Please enter name to proceed");
      return;
    }
    getPerson({
      variables: {
        name: name,
      },
    });
  };

  const onSubmit = (data: SearchParams): void => {
    dispatch(setSearchBy(data.searchBy));
    dispatch(setSearchTerm(data.characterName));
    if (data.searchBy === "All") {
      return searchPeople();
    }

    if (data.searchBy === "Name") {
      return searchPerson(data.characterName);
    }
  };

  //get selected page
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
    searchPeople();
  };

  const getPage = (page: number | undefined) => {
    dispatch(setCurrentPage(page));
    searchPeople();
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Paper>
            <Typography
              variant="h6"
              style={{ marginLeft: 15, marginRight: 15 }}
            >
              Stars Wars Characters
            </Typography>
            <Divider style={{ marginLeft: 15, marginRight: 15 }} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ margin: 15 }}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Controller
                    name="searchBy"
                    render={({ field }) => (
                      <TextField
                        label="Search By"
                        select
                        helperText={errors.searchBy?.message}
                        variant="outlined"
                        size="small"
                        defaultValue={"All"}
                        fullWidth
                        {...field}
                      >
                        {searchByOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    control={control}
                  />
                </Grid>
                {watchSearchBy === "Name" && (
                  <Grid item xs={4}>
                    <Controller
                      name="characterName"
                      render={({ field }) => (
                        <TextField
                          label="Name"
                          helperText={errors.characterName?.message}
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 200 }}
                          fullWidth
                          {...field}
                        />
                      )}
                      control={control}
                    />
                  </Grid>
                )}
                <Grid item xs={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none", marginTop: 2 }}
                    startIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: 15,
              }}
            >
              {total !== 0 && watchSearchBy === "All" && (
                <Chip
                  label={`Total Results: ${total} | Page ${currentPage} of ${numberOfPages}`}
                  color="secondary"
                />
              )}
              {watchSearchBy === "All" && numberOfPages !== 0 && (
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                >
                  <Button disabled={previousPage === undefined} onClick={() => getPage(previousPage)}>
                    <ArrowBackIosIcon />
                  </Button>
                  <Button disabled={nextPage === undefined} onClick={() => getPage(nextPage)}>
                    <ArrowForwardIosIcon />
                  </Button>
                </ButtonGroup>
              )}
            </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Mass</TableCell>
                  <TableCell>Homeworld</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.height}</TableCell>
                    <TableCell>{row.mass}</TableCell>
                    <TableCell>{row.homeworld}</TableCell>
                    <TableCell>
                      <Tooltip title="View person detail" placement="top" arrow>
                        <IconButton
                          aria-label="view"
                          color="primary"
                          onClick={() => viewPerson(row)}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Busy open={getPeopleLoading || getPersonLoading} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default People;
