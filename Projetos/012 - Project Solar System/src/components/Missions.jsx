import React from 'react';
import Title from './Title';
import MissionCard from './MissionCard';
import missions from '../data/missions';

class Missions extends React.Component {
  render() {
    return (
      <div className="missionsMain" data-testid="missions">
        <Title headline="Missões" />
        {missions.map((element) => (<MissionCard
          key={ element.name }
          name={ element.name }
          year={ element.year }
          country={ element.country }
          destination={ element.destination }
        />
        ))}
      </div>
    );
  }
}

export default Missions;
