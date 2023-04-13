import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PaymentsIcon from '@mui/icons-material/Payments';
import './step.css'

const steps = [
  {
    icon: <LocalShippingIcon/>,
    label: <Typography>Shipping Details</Typography>,
  },
  {
    icon: <LibraryAddCheckIcon/>,
    label: <Typography>Confirm Order</Typography>,
  },
  {
    icon: <PaymentsIcon/>,
    label: <Typography>Payment</Typography>,
  },
];

export default function deliveryStepper({activeStep}) {
  return (
    <Box sx={{ width: "100%",marginTop:{lg:"1rem",md:"1rem",sm:"1rem",xs:"3.8rem"} }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step,index) => (
          <Step key={index} acitve={activeStep===index?true:false} completed={activeStep>=index?true:false}>
            <StepLabel icon={step.icon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
