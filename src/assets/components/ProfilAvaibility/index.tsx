import { Typography, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Calendar from '../Calendar';

const ProfilAvaibility = () => {
  return (
    <Card>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignContent='center'
        spacing={1}
      >
        <Grid xs={12} sm={4} md={3}>
          Profil
          <p>
            {' '}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint eum a
            consequatur doloribus nemo incidunt exercitationem repellendus
            quisquam, adipisci quia!
          </p>
        </Grid>
        <Grid xs={12} sm={8} md={9}>
          <Calendar />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfilAvaibility;
