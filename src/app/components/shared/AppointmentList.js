// components/AppointmentList.js

import React, { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { fetchBookedAppointments } from '../lib/appointments';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getAppointments = async () => {
            const data = await fetchBookedAppointments();
            setAppointments(data);
        };

        getAppointments();
    }, []);

    return (
        <div>
            <h2>Booked Appointments</h2>
            <div>
                {appointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </div>
        </div>
    );
};

export default AppointmentList;