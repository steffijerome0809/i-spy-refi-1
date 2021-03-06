import React from 'react';

import HouseIcon from '@material-ui/icons/House';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import noHouseImage from '../../assets/logo/nologoimage/logo_transparent_background.png';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'v-align': {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
  },
}));

export default function CompListItem(props) {
  const classes = useStyles();

  return props.comp ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Grid container className='grid'>
          <Grid item>
            <span className='flip'>
              <HouseIcon className='fontCinzelLgNoShadow flip' />
            </span>
          </Grid>
          <Grid item xs={10}>
            <div>
              {props.comp.address.street_number} {props.comp.address.street}{' '}
              {props.comp.address.street_suffix}, {props.comp.address.city},{' '}
              {props.comp.address.state_code}
            </div>
            <div>$ {props.comp.price ? props.comp.price.toLocaleString() : 'unavailable'}</div>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className='fontCinzelLgNoShadow'>
              Additonal Details
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className='fontCinzel'
            >
              House Size:{' '}
              <b> {props.comp.building_size.size ? `${props.comp.building_size.size.toLocaleString()} sqft`: 'unavailable'}</b>
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className='bold'
            >
              Baths: <b>{props.comp.baths}</b>
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Beds: <b>{props.comp.beds}</b>
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Property Type: <b>{props.comp.prop_type ? props.comp.prop_type.replace(/_/g, " ") : 'unavailable'}</b>
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Year Built: <b>{props.comp.year_built}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              className='media box-shadow card-radius'
              component='img'
              image={
                props.comp.photos[0].href.includes('googleapis')
                  ? props.comp.photos[0].href
                  : noHouseImage
              }
              title='My House'
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Accordion style={{ overflowY: 'hidden' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <Typography align='center' color='textSecondary' gutterBottom>
              Pulling Similar Property
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes['v-align']}>
            {' '}
            <LinearProgress />
          </Grid>
        </Grid>
      </AccordionSummary>
    </Accordion>
  );
}
