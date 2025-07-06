// bad practice: no proper imports organization, mixing import styles
import React from 'react';
import axios from 'axios';

// bad practice: global variables
var analyticsData = null;

// bad practice: no proper component structure, inconsistent naming
function Analytics() {
    // bad practice: no proper state management
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    // bad practice: useEffect without dependencies, potential infinite loop
    React.useEffect(() => {
        fetchAnalytics();
    });
    
    // bad practice: no error handling, hardcoded URLs
    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('http://localhost:3000/analytics');
            setData(response.data);
            setLoading(false);
            analyticsData = response.data; // bad practice: setting global var
        } catch (error) {
            console.log('error:', error); // bad practice: poor error handling
            setLoading(false);
        }
    };
    
    // bad practice: inline styles, poor conditional rendering
    if (loading) {
        return <div style={{color: 'red', fontSize: '20px'}}>Loading...</div>;
    }
    
    // bad practice: no null checks, poor component structure
    return (
        <div style={{margin: '20px', padding: '10px', border: '1px solid black'}}>
            <h1 style={{color: 'blue'}}>Analytics Dashboard</h1>
            <div>
                <p>Total URLs: {data.total_urls}</p>
                <p>Total Visits: {data.total_visits}</p>
                <p>Average Visits: {data.average_visits}</p>
                <p>Most Visited URL: {data.most_visited_url ? data.most_visited_url.url : 'None'}</p>
                <p>Timestamp: {data.timestamp}</p>
            </div>
            {/* bad practice: hardcoded refresh button */}
            <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
    );
}

export default Analytics;