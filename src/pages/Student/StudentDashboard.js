import React from 'react';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';

const StudentDashboard = () => (
  <DashboardTemplate>
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <Heading>Witaj!</Heading>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            backgroundColor: 'yellow',
            width: '400px',
            height: '400px',
          }}
        >
          Nauka
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            backgroundColor: 'yellow',
            width: '400px',
            height: '400px',
          }}
        >
          Testy
        </div>
      </div>
    </div>
  </DashboardTemplate>
);

export default StudentDashboard;
