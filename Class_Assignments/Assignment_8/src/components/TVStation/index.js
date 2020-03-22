import React, { useEffect, useState } from 'react';
import { getTvSchedule } from '../../services/tvService';
import { Card, CardBody, CardTitle, CardSubtitle } from 'shards-react';
import moment from 'moment';
import 'moment/locale/is';
moment.locale('is');

const TVStation = () => {
  const [ tvStations, setTvStations ] = useState([]);
  useEffect(() => {
    (async function () {
      setTvStations(await getTvSchedule());
    })();
  }, []);
  return (
    <div className="tv-schedule">
      <h2>Schedule</h2>
        {
          tvStations.map((t, idx) => (
            <Card key={ `${t.title}-${idx}` }>
              <CardBody>
                <CardTitle>{ t.title }. { t.originalTitle }</CardTitle>
                <CardSubtitle>{ moment(t.startTime).format('LLLL') }</CardSubtitle>
                <p>{ t.description }</p>
              </CardBody>
            </Card>
          ))
        }
    </div>
  );
};

export default TVStation;
