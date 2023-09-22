import React, { FC, useEffect, useState, MouseEvent } from 'react';

import { Typography, IconButton, Divider, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import interne
import { dateType } from '../../types';
import { dispos } from '../../datas/dispos';
import { convertDate, convertTime } from '../../services/convertionDate';
import Modal from '../Modal';
import useModal from '../../hooks/useModal';
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
  // content pour la modal
  const [contentModal, setContentModal] = useState('rendez vous');
  // utilisation du hook personnalisé useHook
  const { openModal, toggleOpenings } = useModal();

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
    // TODO requete back pour avoir les dispos avant la date données et dans la limit 6
    console.log('jours précedents');
  };
  const handleClickAvailabilityAfter = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    // TODO requete back pour avoir les dispos avant la date données et dans la limit 6
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

  const content = <React.Fragment>{contentModal}</React.Fragment>;

  const handleClickButton = (slot: string) => () => {
    const date = convertDate(slot, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const hours = convertTime(slot, {
      hour: '2-digit',
      minute: '2-digit',
    });
    setContentModal(
      `Votre rendez-vous du ${date} à ${hours} a bien été enregistré`,
    );
    toggleOpenings();
    // TODO faire la requete au back:
    // 1. modification des disponibilités
    // 2. get les nouvelles dispos
    // 3. get le rendez vous dans l'agenda
  };

  return (
    <>
      <Modal
        openModal={openModal}
        hide={toggleOpenings}
        headerTitle='Confirmation du rendez-vous'
        modalContent={content}
      />
      <StyledGridContainer
        container
        direction='row'
        justifyContent='center'
        alignContent='center'
        columns={{ xs: 12, md: 14 }}
      >
        <StyledGridIcon xs={1}>
          <IconButton
            aria-label=' voir les dates précedentes'
            onClick={handleClickAvailabilityBefore}
            data-testid='open-modal'
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
                <Grid key={`slot-${i}`}>
                  {data.slots[i] ? (
                    <StyledButton
                      aria-label='selectionne heure choisie'
                      onClick={handleClickButton(data.slots[i])}
                    >
                      {convertTime(data.slots[i], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </StyledButton>
                  ) : (
                    <StyledDivAvailabilityEmpty>
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
    </>
  );
};

export default Calendar;
