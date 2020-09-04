import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { zillow } from '../api/zillow';
import moment from 'moment'; //for fake data, can be removed or used elsewhere when the fake data is pulled out

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CompList from '../components/Dashboard/CompList';
import CompListItem from '../components/Dashboard/CompListItem';
import CompDetails from '../components/Dashboard/CompDetails';
import MyHouse from '../components/Dashboard/MyHouse';
import FormChart from '../components/Dashboard/FormChart';
import TrendingChart from '../components/Dashboard/TrendingChart';

import '../App.css';

function Home(props) {

  // TODO THIS DATA WILL BE COMING FROMTHE DB
  const formData = [
    { room: 'Bathroom', value: 12 },
    { room: 'Bedroom', value: 7 },
    { room: 'Kitchen', value: 7 },
    { room: 'Garage', value: 7 },
    { room: 'Roof', value: 6 },
    { room: 'Porch', value: 5 },
    { room: 'Windows', value: 2 },
    { room: 'Electical', value: 55 },
  ];

  // moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
  // console.log(moment().subtract(10,'days').format("dddd, MMMM Do YYYY, h:mm:ss a"))
  const trendingData = [
    { date: moment().subtract(30, 'days').format('DD-MM-YY'), value: 87654 },
    { date: moment().subtract(20, 'days').format('DD-MM-YY'), value: 45678 },
    { date: moment().subtract(10, 'days').format('DD-MM-YY'), value: 1234567 },
    { date: moment().format('DD-MM-YY'), value: 1098765 },
  ];

  // House Display Info Logic - STEFFI
  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');
  const [statedisplay, setstatedisplay] = useState('');

  const [FormData, setFormData] = useState([]);
  const [TrendingData, setTrendingData] = useState([]);
  const [compaddstreet, setcompaddstreet] = useState([]);
  const [compestatedisplay, setcompstatedisplay] = useState('');
  const [complastsoldprice, setcomplastsoldprice] = useState('');
  const [complastsolddate, setcomplastsolddate] = useState('');
  const [value, setVale] = useState('');
  const [description, setDescription] = useState('');

  // const finishedSqFt = '2466';
  let avgSqFt = 0;
  let avgPerSqFt = 0;
  const [totalHouseValue, settotalHouseValue] = useState('');
  // let formData = [''];
  //  let trendingData = [''];

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);

    // User id is passed once the user login is completed
    const [
      { street, state, city, zip, hid, formdata, comps },
    ] = await houseinfoDB();

    const data = {
      street,
      city,
      state,
      zip,
      hid,
      formdata,
      comps,
    };

    console.log('data : ', data);
    // TODO THIS DATA WILL BE COMING FROMTHE DB

    const formData = [
      { country: 'Russia', area: 12 },
      { country: 'Canada', area: 7 },
      { country: 'USA', area: 7 },
      { country: 'China', area: 7 },
      { country: 'Brazil', area: 6 },
      { country: 'Australia', area: 5 },
      { country: 'India', area: 2 },
      { country: 'Others', area: 55 },
    ];

    setFormData(formData);

    // moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    // console.log(moment().subtract(10,'days').format("dddd, MMMM Do YYYY, h:mm:ss a"))
    const trendingData = [
      { date: moment().subtract(30, 'days').format('DD-MM-YY'), value: 87654 },
      { date: moment().subtract(20, 'days').format('DD-MM-YY'), value: 45678 },
      {
        date: moment().subtract(10, 'days').format('DD-MM-YY'),
        value: 1234567,
      },
      { date: moment().format('DD-MM-YY'), value: 1098765 },
    ];
    setTrendingData(trendingData);

    console.log(data)
    /////////////////// FIRST API CALL /////////////////

    const displayaddress = await zillow.getaddress(data);

    // console.log('houseinfo from zillow :', displayaddress);
    const finishedsqftzillow = displayaddress[0].finishedSqFt;
    //console.log('fsq:', finishedsqftzillow);
    console.log('houseinfo from zillow :', displayaddress.error);
    // HardCoded DATA
    const statezillow = displayaddress[0].address.state;
    setstatedisplay(statezillow);
    const cityzillow = displayaddress[0].address.city;
    setcitydisplay(cityzillow);
    const streetzillow = displayaddress[0].address.street;
    setstreetdisplay(streetzillow);
    const zillowzpid = displayaddress[0].zpid;

    // const state = 'NH';
    // const city = 'portsmouth';
    // const street = '31 Sudbury St';
    // const zip = '03801';
    // setTimeout(() => {
    //////////////////////// SECOND CALL ///////////////////

    setTimeout(async () => {
      const getimageurl = await zillow.getzillowpropid(zillowzpid);
      setImage(getimageurl);
      console.log('getimageurl:', getimageurl);
    }, 1000);

    // APi call to get house eval & 10 comparables
    setTimeout(async () => {
      const houseval = await zillow.gethouseval(zillowzpid);
      console.log('gethouseval:', houseval.data);

      // const statestreetcomp = houseval.data.comparables[0].address.street;
      //  statestreetcomp = houseval.data;
      // console.log(statestreetcomp);
      setcompaddstreet(houseval.data.comparables);
      // const cityzillow = displayaddress[0].address.city;
      // setcitydisplay(cityzillow);
      // const streetzillow = displayaddress[0].address.street;
      // setstreetdisplay(streetzillow);
      // const zillowzpid = displayaddress[0].zpid;

      let comlength = houseval.data.comparables.length;
      //console.log('complength' + comlength);

      // calculating the Average SqFt
      let index = 0;

      for (let i = 0; i < comlength; i++) {
        avgSqFt +=
          houseval.data.comparables[i].lastSoldPrice.value /
          houseval.data.comparables[i].finishedSqFt;
        index = i + 1;
      }
      console.log(avgSqFt);
      avgPerSqFt = avgSqFt / index;

      console.log('avgpersqft:', avgPerSqFt);

      // Calculating The House Value

      const tot = Math.round(finishedsqftzillow * avgPerSqFt);
      settotalHouseValue(tot);
      console.log('housevalue:', tot);

      console.log('avgsqft:', avgPerSqFt);
    }, 3000);
  };

  useEffect(() => {
    fetchaddress();
  }, []);

  return (
    <Container className='signup'>
      <Grid container spacing={3} className="grid">

        {/* --------------- USERS HOUSE --------------- */}
        <Grid item xs={12} sm={5} lg={5} xl={5}>
          <Typography variant='h4' component='h2'>
            My House
          </Typography>
          <MyHouse 
            street={streetdisplay}
            city={citydisplay}
            state={statedisplay}
            imagedata={imageData}
            value={totalHouseValue}
            description={description}
          />
        </Grid>

        {/* --------------- COMPS --------------- */}
        {/* <Grid item xs={12} sm={7} lg={6} xl={4}>
          <Typography variant='h4' component='h2'>
            Comps near Me
          </Typography>
          <CompDetails className="card" />
        </Grid> */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps
          </Typography>
          <CompList street={compaddstreet}/>
        </Grid>

        {/* --------------- CHARTS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography>
          <FormChart data={FormData}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps Trending Data Values
          </Typography>
          <TrendingChart data={TrendingData}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
