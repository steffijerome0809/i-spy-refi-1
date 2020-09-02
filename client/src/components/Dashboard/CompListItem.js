import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function CompListItem({ comp }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography color='textSecondary' gutterBottom></Typography>
          <Typography variant='h5' component='h2'>
            {comp.address.street}
          </Typography>
          <Typography variant='h5' component='h2'>
            $ {comp.lastSoldPrice.value}
          </Typography>
          <Typography color='textSecondary'>
            {comp.address.city}, {comp.address.state},
          </Typography>
          <Typography variant='body2' component='p'>
            Last Sold Date:{comp.lastSoldDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small'>Button</Button>
      </CardActions>
    </Card>
  );
}
