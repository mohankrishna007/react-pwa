import React, { useEffect } from "react";

import * as Names from "../Constants/ReactQueryConsts";
import * as Functions from "../Queries/AdminQueries";

import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import { useQuery } from "react-query";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "5px",
    overflowX: "auto",
  },
  input: {
    width: 130,
    height: 40,
    color: '#ff0000',
  },
}));

const createData = (st, hs, us, s, ms, bs, ns) => ({
  id: st.replace(" ", "_"),
  st,
  hs,
  us,
  s,
  ms,
  bs,
  ns,
  isEditMode: false,
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export default function PATable() {
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  const { isLoading, isError } = useQuery(
    Names.PAVALUES,
    Functions.getPAValues,
    {
      onSuccess: (data) => {
        const values = [];
        data.data.forEach((element) => {
          values.push(
            createData(
              element.student,
              element.hyperselective,
              element.ultraselective,
              element.selective,
              element.moderatelyselective,
              element.bareleyselective,
              element.nonselective
            )
          );
        });
        setRows(values);
      },
    }
  );

  if (isError) {
    return <div>Something Went Wrong</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const onToggleEditMode = (label, id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });

    if (label === "done") {
      var row = rows.find((row) => row.id === id)
      axios.post("http://localhost:5000/admin/pavalues", row).then((resp) => {
        console.log(resp);
      });
    }
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="caption table">
          <caption> Probability of Condition. </caption>
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Student</TableCell>
              <TableCell align="left">Hyper Selective</TableCell>
              <TableCell align="left">Ultra Selective</TableCell>
              <TableCell align="left">Seletive</TableCell>
              <TableCell align="left">Moderatively Selective</TableCell>
              <TableCell align="left">Bareley Selective</TableCell>
              <TableCell align="left">Non Selective</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode("done", row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode("edit", row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>{row.st}</TableCell>
                <CustomTableCell {...{ row, name: "hs", onChange }} />
                <CustomTableCell {...{ row, name: "us", onChange }} />
                <CustomTableCell {...{ row, name: "s", onChange }} />
                <CustomTableCell {...{ row, name: "ms", onChange }} />
                <CustomTableCell {...{ row, name: "bs", onChange }} />
                <CustomTableCell {...{ row, name: "ns", onChange }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
