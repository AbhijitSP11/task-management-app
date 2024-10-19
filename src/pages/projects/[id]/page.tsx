"use client"
import React, { useState } from 'react'
import BoardView from '../BoardView';
import ListView from '../ListView';
import ProjectHeader from '../ProjectHeader';

const Project = () => {
        const [activeTab, setActiveTab] = useState<string>("List");
        return (
            <div>
                <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
                {activeTab === "Board" && (
                    <BoardView/>
                )}
                {activeTab === "List" && (
                    <ListView/>
                )}
            </div>
    )
}

export default Project