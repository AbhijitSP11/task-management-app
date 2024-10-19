"use client"
import React, { useState } from 'react'
import BoardView from '../BoardView';
import ListView from '../ListView';
import ProjectHeader from '../ProjectHeader';

type Props = {
    params : {id: string};
};
const Project = ({params}: Props) => {
    const {id} = params;
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