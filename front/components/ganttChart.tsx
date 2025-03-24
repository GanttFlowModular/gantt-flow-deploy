'use client';

import { useEffect, useState } from "react";
import { Chart } from 'react-google-charts';

// Define the type for a single Gantt chart row
type GanttRow = [
    string, // Task ID
    string, // Task Name
    Date,   // Start Date
    Date,   // End Date
    number | null, // Duration
    number, // Percent Complete
    string | null // Dependencies
];

// Define the type for the full Gantt chart data (header + rows)
type GanttData = [
    Array<{ type: string; label: string }>, // Header row
    ...GanttRow[] // Data rows
];

interface GanttTask {
    taskId: string;
    taskName: string;
    startDate: string; //MongoDB typically retruned as ISO strings
    endDate: string;
    duration: number;
    progress: number;
    dependencies?: string; //Optional since it's not required in the schema
    //Other fields (parentTask,taskType, etc.) are ignored for the chart
}

export default function GanttChart() {
    const [data, setData] = useState<GanttData>([] as any); // Initialize as empty, typed as GanttData




    useEffect(() => {
        const fetchGantt = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/gantt');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();

                console.log('API Response:', result);
                console.log('Data array:', result.data);

                // Check if the data is in the expected format
                const gantt = result.data || []; // Assuming the data is in a 'data' property

                if (!Array.isArray(gantt)) {
                    console.error('Received data is not an array:', gantt);
                    setData([] as any);
                    return;
                }

                const ganttData: GanttData = [
                    [
                        { type: 'string', label: 'Task ID' },
                        { type: 'string', label: 'Task Name' },
                        { type: 'date', label: 'Start Date' },
                        { type: 'date', label: 'End Date' },
                        { type: 'number', label: 'Duration' },
                        { type: 'number', label: 'Percent Complete' },
                        { type: 'string', label: 'Dependencies' },
                    ],
                    ...gantt.map((task) => [
                        task._id || task.id, // MongoDB uses _id by default
                        task.name,
                        new Date(task.start),
                        new Date(task.end),
                        task.duration,
                        task.progress,
                        task.dependencies || null,
                    ] as GanttRow),
                ];

                setData(ganttData);
            } catch (error) {
                console.error('Error fetching Gantt data:', error);
                setData([] as any);
            }
        };

        fetchGantt();
    }, []);

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
        },
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gantt Chart</h2>
            {data.length > 1 ? (
                <Chart
                    width={'100%'}
                    height={'100%'}
                    chartType="Gantt"
                    loader={<div className="text-gray-500">Loading Chart</div>}
                    data={data}
                    options={options}
                />
            ) : (
                <p className="text-gray-600">Loading data...</p>
            )}
        </div>
    );
}