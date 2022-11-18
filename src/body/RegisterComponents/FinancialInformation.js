import React, { useState, forwardRef, useImperativeHandle } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import {
  Switch,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import RegisterTheme from "../../Themes/RegisterTheme";

const FinancialInformation = (props, ref) => {
  const [appplyingFinancialAid, setApplyingFinancialAid] = useState(false);
  const [meritScholarShipImp, setmeritScholarShipImp] = useState(false);
  const [whoPayForCollege, setWhoPayForCollege] = useState("");
  const [studentExpectedIncome, setStudentExpectedIncome] = useState("");
  const [grossFamilyAnnualIncome, setGrossFamilyAnnualIncome] = useState("");
  const [totalNetWorth, setTotalNetWorth] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [monthlyContributions, setMonthlyContributions] = useState("");

  useImperativeHandle(ref, () => ({
    postFinancial,
  }));

  const postFinancial = () => {

    const Financial = {
      ApplyingFinancialAid: appplyingFinancialAid,
      MeritScholarShip: meritScholarShipImp,
      WhoWillPayForCollege: whoPayForCollege,
      StudentExpectedIncome: studentExpectedIncome,
      GrossFamilyAnnualIncome: grossFamilyAnnualIncome,
      TotalFamilyNetWorth: totalNetWorth,
      AmountSaved: amountSaved,
      MonthlyContribution: monthlyContributions,
    };

    localStorage.setItem("financial_info", JSON.stringify(Financial));
  };

  const handlewhoPayForCollege = (event) => {
    setWhoPayForCollege(event.target.value);
  };

  const handleStudentExpectedIncome = (event) => {
    setStudentExpectedIncome(event.target.value);
  };

  const handleGrossFamilyAnnualIncome = (event) => {
    setGrossFamilyAnnualIncome(event.target.value);
  };

  const handletotalNetWorth = (event) => {
    setTotalNetWorth(event.target.value);
  };

  const handleAmountSaved = (event) => {
    setAmountSaved(event.target.value);
  };

  const handleMonthlyContributions = (event) => {
    setMonthlyContributions(event.target.value);
  };

  const whoPayForCollegeOptions = [
    { title: "Student Only", value:"1"},
    { title: "Student and Family", value:"2"},
    { title: "Family Only", value:"3"},
    { title: "Prefer Not to Say", value:"4"},
  ];

  const studentExpectedIncomeOptions = [
    { title: "$0 - $10,000", value: 1 },
    { title: "$10,001 - $20,000", value: 2 },
    { title: "$21,000 - $30,000", value: 3 },
    { title: "$31,000 - $40,000", value: 4 },
    { title: "$41,000 - $50,000", value: 5 },
    { title: "Prefer Not to Say", value: 6 },
  ];

  const grossFamilyAnnualIncomeOptions = [
    { title: "$0 - $30,000", value: 1 },
    { title: "$30,001 - $48,000", value: 2 },
    { title: "$48,001 - $75,000", value: 3 },
    { title: "$75,001 - $110,000", value: 4 },
    { title: "$110,000+", value: 5 },
    { title: "Prefer Not to Say", value: 6 },
  ];

  const totalNetWorthOptions = [
    { title: "$0 - $100,000", value: 1 },
    { title: "$100,001 - $500,000", value: 2 },
    { title: "$500,001 - $1M", value: 3 },
    { title: "$1M - $2M", value: 4 },
    { title: "$2M+", value: 5 },
    { title: "Prefer Not to Say", value: 6 },
  ];

  const amountSavedOptionsOptions = [
    { title: "$0 - $10,000", value: 1 },
    { title: "$10,001 - $25,000", value: 2 },
    { title: "$25,001 - $50,000", value: 3 },
    { title: "$50,001 - $100,000", value: 4 },
    { title: "$100,001 - $200,000", value: 5 },
    { title: "$200,001 - $400,000", value: 6 },
    { title: "$400,00+", value: 7 },
    { title: "Prefer Not to Say", value: 8 },
  ];

  const monthlyContributionsOptions = [
    { title: "$0 - $100", value: 1 },
    { title: "$101 - $250", value: 2 },
    { title: "$251 - $500", value: 3 },
    { title: "$501 - $1,000", value: 4 },
    { title: "$1,001 - $2,000", value: 5 },
    { title: "$2,001 - $4,000", value: 6 },
    { title: "$4,000+", value: 7 },
    { title: "Prefer Not to Say", value: 8 },
  ];

  React.useEffect(() => {
    props.handleError(false);

    var restored = localStorage.getItem('financial_info');

    if(restored != null){
      var data = JSON.parse(restored);
      setApplyingFinancialAid(data.ApplyingFinancialAid);
      setmeritScholarShipImp(data.MeritScholarShip);
      setWhoPayForCollege(data.WhoWillPayForCollege);
      setStudentExpectedIncome(data.StudentExpectedIncome);
      setGrossFamilyAnnualIncome(data.GrossFamilyAnnualIncome);
      setTotalNetWorth(data.TotalFamilyNetWorth);
      setAmountSaved(data.AmountSaved);
      setMonthlyContributions(data.MonthlyContribution);

      localStorage.removeItem('financial_info');
    }
  }, [props]);

  return (
    <div>
      <ThemeProvider theme={createTheme(RegisterTheme)}>
        <MDBCard>
          <MDBCardBody className="px-4 CardBody">
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth required>
                  <p>
                    Do you plan to apply for Financial Aid?
                    <Switch
                      checked={appplyingFinancialAid}
                      onChange={(event) =>
                        setApplyingFinancialAid(event.target.checked)
                      }
                    />
                  </p>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth required>
                  <p>
                    Do you plan to apply for merit based scholarships?
                    <Switch
                      checked={meritScholarShipImp}
                      onChange={(event) =>
                        setmeritScholarShipImp(event.target.checked)
                      }
                    />
                  </p>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="who-will-pay-for-college-label">
                    Who will pay for college?
                  </InputLabel>
                  <Select
                    labelId="who-will-pay-for-college-label"
                    label=" Who Will Pay for College?"
                    value={whoPayForCollege}
                    sx={{ mb: 2 }}
                    onChange={handlewhoPayForCollege}
                  >
                    {whoPayForCollegeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="student-expected-annual-income-label">
                    Student's expected annual income during college
                  </InputLabel>
                  <Select
                    labelId="student-expected-annual-income-label"
                    label="Student Expected Annual Income"
                    value={studentExpectedIncome}
                    sx={{ mb: 2 }}
                    onChange={handleStudentExpectedIncome}
                  >
                    {studentExpectedIncomeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="gross-family-annual-household-income-label">
                    Family's gross annual household income from all sources
                  </InputLabel>
                  <Select
                    labelId="gross-family-annual-household-income-label"
                    label="Gross family annual household income from all sources"
                    value={grossFamilyAnnualIncome}
                    sx={{ mb: 2 }}
                    onChange={handleGrossFamilyAnnualIncome}
                  >
                    {grossFamilyAnnualIncomeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="total-networth-select-label">
                    Total net worth including retirement accounts and primary
                    residence
                  </InputLabel>
                  <Select
                    labelId="total-networth-select-label"
                    label="Total Net Worth including retirement accounts and primary residence"
                    value={totalNetWorth}
                    sx={{ mb: 2 }}
                    onChange={handletotalNetWorth}
                  >
                    {totalNetWorthOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="amount-saved-for-college-select-label">
                    Amount saved for college (including 529 accounts for US
                    residents)
                  </InputLabel>
                  <Select
                    labelId="amount-saved-for-college-select-label"
                    label="Amount saved for college (including 529 accounts for US residents)"
                    value={amountSaved}
                    sx={{ mb: 2 }}
                    onChange={handleAmountSaved}
                  >
                    {amountSavedOptionsOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="planned-monthly-contribution-select-label">
                    Planned monthly contributions towards college fund
                  </InputLabel>
                  <Select
                    labelId="planned-monthly-contribution-select-label"
                    label="Planned monthly contributions towards college fund"
                    value={monthlyContributions}
                    sx={{ mb: 2 }}
                    onChange={handleMonthlyContributions}
                  >
                    {monthlyContributionsOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </div>
  );
};
export default forwardRef(FinancialInformation);
