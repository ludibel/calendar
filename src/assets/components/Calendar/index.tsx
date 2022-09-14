import { FC, useEffect, useState, MouseEvent } from 'react';
import { Typography, IconButton, Divider, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import interne
import { dateType } from '../../types';
import { dispos } from '../../datas/dispos';
import { convertDate, convertTime } from '../../services/convertionDate';
// import des composants mui stylés
import {
  StyledGridDate,
  StyledGridAvailability,
  StyledDivAvailabilityEmpty,
  StyledGridDatas,
  StyledDivAvailabilityDash,
  StyledGridContainer,
  StyledGridIcon,
  StyledButton,
  StyledGridMoreAvailability,
  StyledButtonMoreAvailability,
} from './styledCalendar';
const TITLEBUTTON = {
  MORE: "VOIR PLUS D'HORAIRE",
  LEST: "VOIR MOINS D'HORAIRE",
};

const Calendar: FC = () => {
  const [arraydatas, setArraydatas] = useState(dispos);
  // state pour la longueur du tableau de disponibilité
  const [arraylength, setArraylength] = useState(4);
  // state pour connaitre la valeur de la plus grande longueur de tableau slots
  const [greatValueArraySlots, setGreatValueArraySlots] = useState(4);
  // state pour voir le button voir plus d'horaire
  const [showButton, setShowButton] = useState(false);
  // nom pour le bouton plus ou moins d'horaire
  const [nameButton, setNameButton] = useState(TITLEBUTTON.MORE);

  // fonction permettant de récupérer la longueur du tableau des slots
  // et si cette longueur > 3 on affiche le button 'voir plus d'horaire"

  const getLengthArray = (array: Array<dateType>) => {
    const greatLength: number[] = [];
    {
      array.map((data) => {
        greatLength.push(data.slots.length);
        data.slots.length = Math.max(...greatLength);
        {
          data.slots.length <= 3 ? setShowButton(false) : setShowButton(true);
        }
        setGreatValueArraySlots(data.slots.length);
      });
    }
  };
  // fonction vérifiant la résolution de l'écran et selon la résolution modifie le tableau des dates
  const getResolution = () => {
    const resolution = window.screen.width;
    setArraylength(4);
    if (resolution < 768) {
      // En resolution <768 reduit le tableau à une longueur de 3 afin d'afficher que les 3 premiers jours
      // puis on mappe le tableau pour trouver la longueur du tableau de slots la plus grande entre les 3 jours
      setArraydatas(dispos.slice(0, 3));
      const newArray = dispos.slice(0, 3);
      getLengthArray(newArray);
    } else if (resolution < 1024) {
      // En resolution < 1024 reduit le tableau à une longueur de 4 afin d'afficher que les 4 premiers jours
      // puis on mappe le tableau pour trouver la longueur du tableau de slots la plus grande entre les 4 jour
      setArraydatas(dispos.slice(0, 4));
      const newArray = dispos.slice(0, 4);
      getLengthArray(newArray);
    } else {
      // on récupére 6 jours
      setArraydatas(dispos.slice(0, 6));
      const newArray = dispos.slice(0, 6);
      getLengthArray(newArray);
    }
  };

  useEffect(() => {
    // A chaque reinitilisation de la taille en effectuer le fonction getResolution()
    window.addEventListener('resize', getResolution);
    getResolution();
  }, [dispos]);

  const handleClickAvailabilityBefore = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    console.log('jours précedents');
  };
  const handleClickAvailabilityAfter = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    console.log('dispos suivantes');
  };

  const HandleMoreAvailability = () => {
    switch (nameButton) {
      case TITLEBUTTON.MORE:
        setArraylength(greatValueArraySlots);
        setNameButton(TITLEBUTTON.LEST);
        break;
      case TITLEBUTTON.LEST:
        setArraylength(4);
        setNameButton(TITLEBUTTON.MORE);
        break;
      default:
        setArraylength(greatValueArraySlots);
    }
  };

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
          <StyledGridContainer
            container
            direction='row'
            justifyContent='center'
            alignContent='center'
            columns={{ xs: 12, md: 14 }}
          >
            <StyledGridIcon xs={1}>
              <IconButton
                aria-label=' voie lesdates précedentes'
                onClick={handleClickAvailabilityBefore}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </StyledGridIcon>
            {arraydatas.map((data, index) => (
              <StyledGridDatas xs={3} sm={2} key={`avaib-${data.day}`}>
                <StyledGridDate>
                  <Typography>
                    {convertDate(data.day, {
                      weekday: 'long',
                    })}
                  </Typography>
                  <Typography>
                    {convertDate(data.day, {
                      day: 'numeric',
                    })}{' '}
                    {convertDate(data.day, {
                      month: 'long',
                    }).substring(0, 3)}
                    .
                  </Typography>
                </StyledGridDate>
                <StyledGridAvailability>
                  {/* permet de créer un tableau de la longueur arraylength (4 en initial ou de la valeur calculée lors l'évenement onClick de "voir plus d'horaire")
                    et de mapper data.slots avec des index supérieurs à data.slots.length */}
                  {Array.from(new Array(arraylength)).map((_, i) => (
                    <Grid>
                      {data.slots[i] ? (
                        <StyledButton key={`slot-${index}`}>
                          {convertTime(data.slots[i], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </StyledButton>
                      ) : (
                        <StyledDivAvailabilityEmpty key={`slot-empty-${index}`}>
                          <StyledDivAvailabilityDash />
                        </StyledDivAvailabilityEmpty>
                      )}
                    </Grid>
                  ))}
                </StyledGridAvailability>
              </StyledGridDatas>
            ))}
            <StyledGridIcon xs={1}>
              <IconButton
                aria-label='voir les dates suivantes'
                onClick={handleClickAvailabilityAfter}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </StyledGridIcon>
          </StyledGridContainer>
          <Divider />
          {showButton ? (
            <StyledGridMoreAvailability>
              <StyledButtonMoreAvailability
                variant='text'
                onClick={HandleMoreAvailability}
              >
                {nameButton}
              </StyledButtonMoreAvailability>
            </StyledGridMoreAvailability>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default Calendar;
