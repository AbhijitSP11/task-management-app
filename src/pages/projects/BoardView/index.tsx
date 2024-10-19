import React from 'react'

type Props = {
    id: string
    setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BoardView = ({id, setIsModalNewTaskOpen}: Props) => {
  return (
    <div>BoardView</div>
  )
}
export default BoardView;