import * as React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import axios from "axios";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []))
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

var schoolsData = [];


export default function NameofHighSchool(props) {
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = React.useState(false);

  const [schoolName, setSchoolName] = React.useState("");
  const [schoolCity, setSchoolCity] = React.useState("");
  const [schoolState, setSchoolState] = React.useState("");
  const [schoolZipcode, setSchoolZipcode] = React.useState("");
  const [schoolType, setSchoolType] = React.useState("");

  const handleAddSchool = () => {
    setSnack(true);

    var school = {
      NAME: schoolName,
      CITY: schoolCity,
      STATE: schoolState,
      ZIP: schoolZipcode,
      TYPE: schoolType,
    };

    var updatedSchools = [...schoolsData, school];

    handleAddingSchoolDatabase(school);
    schoolsData = updatedSchools;

    console.log(schoolsData);

    handleClose();
  };

  React.useState(() => {
    schoolsData = JSON.parse(props.schools())
  })

  const handleAddingSchoolDatabase = (school) => {
    axios
      .post(
        "https://collegeportfoliobackendnode.azurewebsites.net/student/addSchool",
        school
      )
      .then((resp) => console.log(resp));

    setSchoolName("");
    setSchoolCity("");
    setSchoolState("");
    setSchoolZipcode("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add your school details</DialogTitle>
        <DialogContent>
          <MDBCard>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12">
                  <TextField
                    autoFocus
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label="School Name"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <TextField
                    autoFocus
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label="City"
                  />
                </MDBCol>
                <MDBCol md="6">
                  <TextField
                    autoFocus
                    value={schoolState}
                    onChange={(e) => setSchoolState(e.target.value)}
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label="State"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <TextField
                    value={schoolZipcode}
                    onChange={(e) => setSchoolZipcode(e.target.value)}
                    autoFocus
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label="Zipcode"
                  />
                </MDBCol>
                <MDBCol md="6">
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="school-type">School Type</InputLabel>
                    <Select
                      variant="standard"
                      labelId="school-type"
                      label="School Type"
                      value={schoolType}
                      placeholder="School Type"
                      onChange={(event) => setSchoolType(event.target.value)}
                      fullWidth
                    >
                      <MenuItem key={"private"} value={"Private"}>
                        Private
                      </MenuItem>
                      <MenuItem key={"public"} value={"Public"}>
                        Public
                      </MenuItem>
                    </Select>
                  </FormControl>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddSchool}
            disabled={schoolName.length === 0 ? true : false}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack}
        autoHideDuration={2000}
        onClose={() => setSnack(false)}
      >
        <Alert
          onClose={() => setSnack(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your Response
        </Alert>
      </Snackbar>

      <Autocomplete
        disabled={open}
        id="schools-highschools"
        options={schoolsData}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        getOptionLabel={(option) => option.NAME}
        onChange={(event, value) => {
          props.NameOfSchool(value.NAME);
        }}
        noOptionsText={
          <p onClick={handleClickOpen} style={{ cursor: "pointer" }}>
            Add school now
          </p>
        }
        renderOption={(props, option) => [
          props,
          <div>
            {option.NAME}
            <div style={{ fontSize: "0.6em" }}>
              {option.CITY} {option.STATE} {option.ZIP}
              {" - "}
              {option.TYPE}
            </div>
          </div>,
        ]}
        filterSelectedOptions
        sx={{ mb: 2 }}
        renderInput={(params) => (
          <TextField {...params} required label="Name of High School" />
        )}
      />
    </div>
  );
}
