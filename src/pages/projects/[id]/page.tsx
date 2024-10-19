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
        const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);
    
        return (
            <div>
                <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} id={id}/>
                {activeTab === "Board" && (
                    <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )}
                {activeTab === "List" && (
                    <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
                )}
            </div>
    )
}

export default Project