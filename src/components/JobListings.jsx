import React from 'react'
import { useState, useEffect } from 'react';

import JobListing from './JobListing'

const JobListings = ({ isHome = true }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`http://localhost:5000/jobs${isHome? '?_limit=3': ''}`);
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.log('Error')
            } finally {
                setLoading(false)
            }
        }

        fetchJobs();
    }, []);

    return (
        <div>
            <section className="bg-blue-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        {isHome ? 'Recent Jobs' : 'All Jobs'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {
                            jobs.map(
                                (job) => <JobListing job={job} />
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default JobListings