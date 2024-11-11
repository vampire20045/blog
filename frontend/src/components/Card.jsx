import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Travel from '../assets/Travel.jpg'; // Corrected import for the image

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345, mt: 4, mx: 2, border: '1px solid #ccc', borderRadius: '8px' }}> {/* Added border and borderRadius */}
      <CardMedia
        sx={{ height: 140 }}
        image={Travel}
        title="Travel"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
