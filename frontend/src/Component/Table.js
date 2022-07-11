import React from 'react'
import './Table.css'
import TableRow from './TableRow'

export default function Table(props) {

  let output=<h1>no data to show...</h1>
  if (props.data){
    
    output=<table>
    <thead>
      <tr>
      <th>ID</th>
      <th>Input</th>
      <th>Output</th>
      <th>Delete</th>
      <th>Update</th>
      </tr>
      </thead>
      <tbody>
        {props.data.map((translation) =>
      
      (
      <TableRow row={{...translation ,deleteHandler:props.deleteHandler,updateHandler:props.updateHandler}}/>
      
      
      )

)

}
</tbody>
</table>
}
  


  return (
    output
  )
}


