import {
  Container,
  Input,
  MenuItem,
  Box,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Country, State } from "country-state-city";
import React, { useState } from "react";
import { shippingStore } from "../Stores/shippingStore";
import Stepper from './Stepper'

export default function Shipping() {
  const shipInfo = shippingStore(state=>state.shippingInfo)
  const setShipInfo = shippingStore(state=>state.setShippingInfo)
  const [shippingInfo, setShippingInfo] = useState({
    address: shipInfo?shipInfo.address:'',
    city: shipInfo?shipInfo.city:'',
    pincode: shipInfo?shipInfo.pincode:'',
    phone: shipInfo?shipInfo.phone:'',
    country: shipInfo?shipInfo.country:'',
  });
  const changeData = (e) => {
    console.log("working", shippingInfo.country);
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  const submit = (e)=>{
    e.preventDefault();
    setShipInfo(shippingInfo)
  }
  return (
    <>
      <Stepper activeStep={0}/>
      <Container maxWidth="lg" sx={{ width: "100vw",height:"100vh", paddingTop: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"column"
          }}
        >
          <Typography variant="h4" textAlign={'center'} letterSpacing={1} sx={{marginBottom:"2rem",borderBottom:"2px solid gray",paddingBottom:".4rem",width:"30%"}}>Shipping Details</Typography>
          <form
            style={{
              border: "2px solid gray",
              borderRadius: ".5rem",
              height: "25rem",
              width: "22rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <div className="address" style={{width:"100%",paddingLeft:"1rem"}}>
              <HomeIcon />
              <Input
               name="address"
                type="text"
                placeholder="enter your address"
                value={shippingInfo.address}
                required
                onChange={changeData}
                sx={{width:"80%"}}
              />
            </div>
            <div className="city" style={{width:"100%",paddingLeft:"1rem"}}>
              <ApartmentIcon />
              <Input
                name="city"
                type="text"
                placeholder="enter your city"
                value={shippingInfo.city}
                required
                onChange={changeData}
                sx={{width:"80%"}}
              />
            </div>
            <div className="pincode" style={{width:"100%",paddingLeft:"1rem"}}>
              <PersonPinCircleIcon />
              <Input
                name="pincode"
                type="number"
                placeholder="enter your pincode"
                required
                value={shippingInfo.pincode}
                onChange={changeData}
                sx={{width:"80%"}}
              />
            </div>
            <div className="phone" style={{width:"100%",paddingLeft:"1rem"}}>
              <PhoneIcon />
              <Input
                name="phone"
                type="number"
                placeholder="enter your phone no."
                required
                value={shippingInfo.phone}
                onChange={changeData}
                sx={{width:"80%"}}
              />
            </div>
            <div className="country" style={{ width: "100%",display:"flex",alignItems:"center",paddingLeft:"1rem"}}>
              <PublicIcon sx={{marginRight:".4rem"}}/>
              <FormControl variant="standard" sx={{minWidth:"100%"}}>
                <InputLabel id="demo-simple-select-standard-label">
                  Country
                </InputLabel>
                <Select
                  name="country"
                  sx={{ width: "80%" }}
                  value={shippingInfo.country}
                  onChange={changeData}
                  label="Country"
                  required
                >
                  {Country &&
                    Country.getAllCountries().map((country) => (
                      <MenuItem value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="state" style={{ width: "100%",display:"flex",alignItems:"center",paddingLeft:"1rem" }}>
              <LocationCityIcon sx={{ marginRight: ".4rem" }} />
              <FormControl variant="standard" sx={{minWidth:"100%"}}>
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
              <Select
                name="state"
                sx={{ width: "80%" }}
                label="State"
                value={shippingInfo.state}
                onChange={changeData}
                required
                disabled={shippingInfo.country ? false : true}
              >
                {
                  State.getStatesOfCountry(shippingInfo.country).map(
                    (state) => (
                      <MenuItem value={state.isoCode} key={state.isoCode}>
                        {state?state.name:"name"}
                      </MenuItem>
                    )
                  )}
              </Select>
              </FormControl>
            </div>
            <Button variant="outlined" type="submit" sx={{marginTop:"1rem",width:"100%"}} onClick={submit}>Continue</Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
