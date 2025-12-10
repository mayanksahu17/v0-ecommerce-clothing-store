'use client';
import { useState, useEffect } from 'react';
import { parsePaymentResponse } from 'sabpaisa-pg-dev';

const ResponsePage = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        const authKey = process.env.NEXT_PUBLIC_AUTH_KEY;
        const authIV = process.env.NEXT_PUBLIC_AUTH_IV;

        const parseResponse = async () => {
            try {
                const data = await parsePaymentResponse(authKey, authIV);
                setResponse(data && typeof data === 'object' ? Object.entries(data) : []);
            } catch (error) {
                console.error("Error parsing payment response:", error);
            }
        };
        parseResponse();
    }, []);


    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h2>Payment Response Details</h2>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Field</th>
                        <th style={{ textAlign: 'left' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {response.map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value === null ? <i style={{ color: 'gray' }}>N/A</i> : String(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResponsePage;
