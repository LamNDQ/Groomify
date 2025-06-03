'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Thêm state để lọc và sắp xếp
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [sortBy, setSortBy] = useState('date'); // date, service, client

    const getAppointments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/bookings');
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAppointments().then(data => setAppointments(data));
    }, []);

    // Lọc appointments
    const filteredAppointments = appointments.filter(apt => {
        if (filter === 'all') return true;
        return apt.status === filter;
    });

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Appointment Dashboard</h1>
                <div className={styles.controls}>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">All Appointments</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </header>

            <main className={styles.main}>
                {error && (
                    <div className={styles.error}>
                        Error: {error}
                    </div>
                )}

                {loading ? (
                    <div className={styles.loading}>Loading appointments...</div>
                ) : (
                    <>
                        <div className={styles.stats}>
                            <div className={styles.statCard}>
                                <h3>Total Appointments</h3>
                                <p>{appointments.length}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Pending</h3>
                                <p>{appointments.filter(apt => apt.status === 'pending').length}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Completed</h3>
                                <p>{appointments.filter(apt => apt.status === 'completed').length}</p>
                            </div>
                        </div>

                        <div className={styles.appointmentGrid}>
                            {filteredAppointments.map((appointment) => (
                                <div key={appointment.id} className={styles.appointmentCard}>
                                    <h3>Appointment Details</h3>
                                    <p><strong>Pet:</strong> {appointment.petName}</p>
                                    <p><strong>Owner:</strong> {appointment.ownerName}</p>
                                    <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {appointment.time}</p>
                                    <p><strong>Service:</strong> {appointment.service}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`${styles.status} ${styles[appointment.status]}`}>
                                            {appointment.status}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}