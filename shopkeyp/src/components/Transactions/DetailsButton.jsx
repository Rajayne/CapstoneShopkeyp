import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom';

const DetailsButton = ({transactionId}) => {
  return (
    <Button className="DetailsButton" variant="contained">
      <NavLink className="DetailsButton-link" to={`/transactions/${transactionId}`}>More Details</NavLink>
    </Button>
  )
}

export default DetailsButton;