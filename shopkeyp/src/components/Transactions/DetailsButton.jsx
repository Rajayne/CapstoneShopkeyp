import { Button } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const DetailsButton = ({transactionId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate(`/transactions/${transactionId}`)
  }
  return (
    <Button className="DetailsButton" style={{ fontSize: '.75em' }} onClick={handleClick} variant="contained">
      <InfoOutlinedIcon/><span className="Button-text">Details</span>
    </Button>
  )
}

export default DetailsButton;