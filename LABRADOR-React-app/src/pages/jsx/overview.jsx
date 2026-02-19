import React from 'react';
import '../css/overview.css';

const Overview = () => {
    return (
        <div className="dashboard-wrapper" style={{ display: 'flex', height: '100vh' }}>
            <nav>
                <h2>EduDash Pro</h2>
                <a href="#" className="active">Overview</a>
                <a href="#">Students</a>
                <a href="#">Courses</a>
                <a href="#">Enrollment</a>
                <a href="#">Reports</a>
                <a href="#">Settings</a>
            </nav>

            <main>
                <div className="header">
                    <h1>Administrative Overview</h1>
                    <p>Welcome back! Here is what's happening today.</p>
                </div>

                <div className="card">
                    <h3>Revenue Overview (Last 6 Months)</h3>
                    <div className="chart-container">
                        <div className="bar" style={{ height: '40%' }} data-label="Jan"></div>
                        <div className="bar" style={{ height: '65%' }} data-label="Feb"></div>
                        <div className="bar" style={{ height: '50%' }} data-label="Mar"></div>
                        <div className="bar" style={{ height: '85%' }} data-label="Apr"></div>
                        <div className="bar" style={{ height: '70%' }} data-label="May"></div>
                        <div className="bar" style={{ height: '95%' }} data-label="Jun"></div>
                    </div>
                </div>

                <div className="card weather-widget">
                    <h3>Local Weather</h3>
                    <div style={{ fontSize: '3rem' }}>24°C</div>
                    <p>Partly Cloudy</p>
                    <p><strong>Tagum City, PH</strong></p>
                </div>

                <div className="card">
                    <h3>Active Enrollments</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px 0' }}>Computer Science</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>120</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px 0' }}>Business Admin</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>85</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 0' }}>Graphic Design</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>42</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="card chatbot">
                    <h3>Support Assistant</h3>
                    <div className="chat-window">
                        <div className="chat-msg bot">Hello! How can I help you with the student reports today?</div>
                        <div className="chat-msg user">Show me the enrollment deadline.</div>
                        <div className="chat-msg bot">The deadline for Fall 2026 is August 15th.</div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message..." />
                        <button>Send</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Overview;