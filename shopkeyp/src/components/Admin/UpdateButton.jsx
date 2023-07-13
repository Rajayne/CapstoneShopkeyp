import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom';

const UpdateButton = ({itemId}) => {
  return (
    <Button className="UpdateButton" variant="contained">
      <NavLink className="UpdateButton-link" to={`/admin/items/${itemId}/edit`}>Edit</NavLink>
    </Button>
  )
}

export default UpdateButton;