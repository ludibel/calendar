import React, { FC, useCallback, useEffect, useState } from 'react';
import { Typography, IconButton, Divider, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import interne
import { dateType, formatDate } from '../../types';
import { convertir } from '../../services/convertionDate';
import { dispos } from '../../datas/dispos';
// import des composants mui stylés
import {
  StyledBox,
  StyledBoxBis,
  StyledGridDate,
  StyledGridAvailability,
  StyledDivAvailability,
  StyledDivAvailabilityEmpty,
  StyledGridDatas,
  StyledDivAvailabilityDash,
  StyledGridContainer,
  StyledGridIcon,
  StyledButton,
  StyledGridMoreAvailability,
  StyledButtonMoreAvailability,
} from './styledCalendar';

type date = {
  day: string;
  number: number;
  month: string;
  slots: string[];
};

const datas: Array<date> = [
  {
    day: 'lundi',
    number: 1,
    month: 'sept',
    slots: ['11:00', '15:00'],
  },
  {
    day: 'mardi',
    number: 2,
    month: 'sept',
    slots: ['12:00', '16:00', '17:00'],
  },
  {
    day: 'mercredi',
    number: 3,
    month: 'sept',
    slots: [],
  },
  {
    day: 'jeudi',
    number: 4,
    month: 'sept',
    slots: ['08:00', '09:00', '16:00', '17:00', '18:00'],
  },
  {
    day: 'vendredi',
    number: 5,
    month: 'sept',
    slots: ['08:00', '09:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  },
  {
    day: 'samedi',
    number: 6,
    month: 'sept',
    slots: ['13:00', '14:00', '15:00'],
  },
];

const Calendar: FC = () => {
  const [arraydatas, setArraydatas] = useState(datas);
  const [avaib, setAvaib] = useState<formatDate[]>([]);
  //  const [arraydatas, setArraydatas] = useState<formatDate>();
  // state pour la longueur du tableau de disponibilité
  const [arraylength, setArraylength] = useState(4);
  // state pour connaite la valeur de la plus grande longueur de tableau slots
  const [greatValueArraySlots, setGreatValueArraySlots] = useState(4);
  // state pour voir le button voir plus d'horaire
  const [showButton, setShowButton] = useState(false);
  // nom pour le bouton plus ou moins d'horaire
  const [nameButton, setNameButton] = useState(`Voir plus d'horaire`);

  // fonction permettant de récupérer la longueur du tableau des slots
  // et si cette longueur > 3 on affiche le button 'voir plus d'horaire"

  const getLengthArray = (array: Array<formatDate>) => {
    const greatLength: number[] = [];
    {
      array.map((data) => {
        greatLength.push(data.slots.length);
        data.slots.length = Math.max(...greatLength);
        {
          data.slots.length <= 3 ? setShowButton(false) : setShowButton(true);
        }
        console.log(data.slots.length);
        setGreatValueArraySlots(data.slots.length);
      });
    }
  };
  // fonction vérifiant la résolution de l'écran et selon la résolution modifie le tableau des dates
  // const getResolution = () => {
  //   const resolution = window.screen.width;
  //   setArraylength(4);
  //   console.log(resolution);
  //   if (resolution < 768) {
  //     // on reduit le tableau à une longueur de 3 afin d'afficher que les 3 premiers jours
  //     // puis on mappe le tableau pour trouver la longueur du tableau de slots la plus grande entre les 3 jours
  //     setArraydatas(datas.slice(0, 3));
  //     const newArray = datas.slice(0, 3);
  //     getLengthArray(newArray);
  //   } else if (resolution < 1024) {
  //     setArraydatas(datas.slice(0, 4));
  //     const newArray = datas.slice(0, 4);
  //     getLengthArray(newArray);
  //   } else {
  //     // on récupére tous les jours
  //     getLengthArray(datas);
  //     setArraydatas(datas);
  //   }
  // };
  const getResolutionB = () => {
    const resolution = window.screen.width;
    setArraylength(4);
    console.log(resolution);
    const test = convertir(dispos);
    setAvaib(test);
    console.log(test);
    if (resolution < 768) {
      // on reduit le tableau à une longueur de 3 afin d'afficher que les 3 premiers jours
      // puis on mappe le tableau pour trouver la longueur du tableau de slots la plus grande entre les 3 jours
      setAvaib(test.slice(0, 3));
      const newArray = test.slice(0, 3);
      getLengthArray(newArray);
    } else if (resolution < 1024) {
      setAvaib(test.slice(0, 4));
      const newArray = test.slice(0, 4);
      getLengthArray(newArray);
    } else {
      // on récupére tous les jours
      setAvaib(test.slice(0, 6));
      const newArray = test.slice(0, 6);
      getLengthArray(newArray);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', getResolutionB);
    getResolutionB();
  }, []);

  const handleClickAvailabilityBefore = () => {
    console.log('jours précedents');
  };
  const handleClickAvailabilityAfter = () => {
    console.log('dispos suivantes');
  };

  const HandleMoreAvailability = () => {
    switch (nameButton) {
      case "Voir plus d'horaire":
        setArraylength(greatValueArraySlots);
        setNameButton(`Voir moins d'horaire`);
        break;
      case "Voir moins d'horaire":
        setArraylength(4);
        setNameButton(`Voir plus d'horaire`);
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
            {avaib.map((data, index) => (
              <StyledGridDatas xs={3} sm={2} key={`avaib-${index}`}>
                <StyledGridDate>
                  <Typography> {data.day} </Typography>
                  <Typography>
                    {data.date} {data.month.substring(0, 3)}.
                  </Typography>
                </StyledGridDate>
                <StyledGridAvailability>
                  {/* permet de créer un tableau de la longueur arraylength (4 en initial ou de la valeur calculée lors l'évenement onClick de "voir plus d'horaire")
                    et de mapper data.slots avec des index supérieurs à data.slots.length */}
                  {Array.from(new Array(arraylength)).map((_, i) => (
                    <div>
                      {data.slots[i] ? (
                        <StyledButton key={`slot-${index}`}>
                          {data.slots[i]}
                        </StyledButton>
                      ) : (
                        <StyledDivAvailabilityEmpty key={`slot-empty-${index}`}>
                          <StyledDivAvailabilityDash />
                        </StyledDivAvailabilityEmpty>
                      )}
                    </div>
                  ))}
                </StyledGridAvailability>
              </StyledGridDatas>
            ))}
            <StyledGridIcon xs={1}>
              <IconButton
                aria-label='voir les dates suivantes'
                onClick={handleClickAvailabilityBefore}
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
