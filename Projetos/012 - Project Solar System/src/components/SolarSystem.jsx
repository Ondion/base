import React from 'react';
import Title from './Title';
import PlanetCard from './PlanetCard';
import planets from '../data/planets';

class SolarSystem extends React.Component {
  render() {
    return (
      <div className="solarCss" data-testid="solar-system">
        <Title headline="Planetas" />
        {planets.map((element) => (<PlanetCard
          key={ element.name }
          planetName={ element.name }
          planetImage={ element.image }
        />))}
      </div>
    );
  }
}

export default SolarSystem;
