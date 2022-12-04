import * as React from "react";
import * as Names from "../Constants/ReactQueryConsts";
import * as Functions from "../PrefetchData/DataLoadFunctions";

import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import Typography from "@mui/material/Typography";
import { useQuery, useQueryClient } from "react-query";
import { IconButton } from "@material-ui/core";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { InputAdornment } from "@mui/material";


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
    itemData.push(...(item.children || []));
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

export default function ListofColleges() {
  const [colleges, setColleges] = React.useState([]);
  const [selectedColleges, setSelectedColleges] = React.useState([]);
  const [randNum, setRanNum] = React.useState(100);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useQuery(Names.COLLEGES, Functions.fetchColleges, {
    initialData: () => {
      const colleges = queryClient.getQueriesData(Names.COLLEGES)?.data
      return {data: colleges};
    },
    onSuccess: (data) => {
      setColleges(data?.data);
    },
    onError: () => {
      console.log("Failed to Load Colleges Data");
    },
  });

  const handleSelectedColleges = (value) => {
    var col = [];
    value.forEach((opt) => col.push({unitID: opt.UNITID}));
    setSelectedColleges(col);

    var ran = parseInt(Math.random() * (colleges.length - 0) + 0);
    setRanNum(ran)
  };

  const showThreea = () => {
    if(selectedColleges.length === 0){
      return;
    }
    navigate("/grades", {
      state: {
        colleges: selectedColleges,
      },
    });
  };

  return (
    <MDBRow>
      <MDBCol md="12">
        <Autocomplete
          multiple
          options={colleges}
          disableCloseOnSelect
          disableListWrap
          PopperComponent={StyledPopper}
          ListboxComponent={ListboxComponent}
          getOptionLabel={(option) => option.INSTNM}
          renderOption={(props, option) => [
            props,
            <div>
              {option.INSTNM}
              <div style={{ fontSize: "0.6em" }}>
                {option.CITY} {option.STATE_NAME}
              </div>
            </div>,
          ]}
          onChange={(e, value) => handleSelectedColleges(value)}
          filterSelectedOptions
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} required
            placeholder= {(colleges.length !== 0)? colleges[randNum].INSTNM : "Choose colleges"}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <IconButton onClick={showThreea}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}/>
          )}
        />
      </MDBCol>
    </MDBRow>
  );
}
