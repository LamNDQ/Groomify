import React from 'react';
import PropTypes from 'prop-types';

const AppointmentCard = ({ appointment }) => {
    return (
        <div className={styles.appointmentCard}>
            <h3>{appointment.clientName}</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Details: {appointment.details}</p>
        </div>
    );
};

AppointmentCard.propTypes = {
    appointment: PropTypes.shape({
        clientName: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        details: PropTypes.string,
    }).isRequired,
};

export default AppointmentCard;