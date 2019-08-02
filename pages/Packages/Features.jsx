import React from 'react';
import videoIcon from 'assets/images/icons/video@2x.png';
import bookIcon from 'assets/images/icons/book@2x.png';
import cloudIcon from 'assets/images/icons/cloud@2x.png';
import timeIcon from 'assets/images/icons/time@2x.png';
import mobileIcon from 'assets/images/icons/mobile@2x.png';
import './styles.scss';

const data = [
  { title: 'Clases online grabadas', icon: videoIcon },
  { title: 'Teoría y ejercicios', icon: bookIcon },
  { title: 'Material descargable', icon: cloudIcon },
  { title: 'Disponiblidad 24/7', icon: timeIcon },
  { title: 'Desde cualquier dispositivo', icon: mobileIcon },
];

const featuresList = data.map((feature, index) => (
  <div className="packages-feature-item" key={index}>
    <div className="packages-feature-item-icon"><img src={feature.icon} alt={data.title} /></div>
    <div className="packages-feature-item-title">{feature.title}</div>
  </div>
));

const Features = () => (
  <div className="packages-features course-section">
    <h2 className="packages-course-title">Todos los paquetes incluyen</h2>
    <div className="packages-features-list">
      {featuresList}
    </div>
  </div>
);

export default Features;
