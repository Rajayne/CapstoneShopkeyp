import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const DetailsButton = ({transactionId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate(`/transactions/${transactionId}`)
  }
  return (
    <Button className="DetailsButton" style={{ fontSize: '.75em' }} onClick={handleClick} variant="contained">
      More Details
    </Button>
  )
}

export default DetailsButton;