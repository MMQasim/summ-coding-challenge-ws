import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh, faRemove} from '@fortawesome/free-solid-svg-icons'
export default function TableRow(props) {
  return (
    <>
    <tr key={props.row.id}>
  <td>{props.row.id}</td>
  <td>{props.row.input_text}</td>
  <td>{props.row.output_text}</td>
  <td><FontAwesomeIcon icon={faRemove} style={{"color":"white"}} onClick={()=>props.row.deleteHandler(props.row.id)}/></td>
  <td><FontAwesomeIcon icon={faRefresh} style={{"color":"white"}} onClick={()=>props.row.updateHandler(props.row.id)}/></td>
  </tr>
    </>
  )
}
