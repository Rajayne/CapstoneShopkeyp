import { Button } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const InfoButton = ({itemId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shop/items/${itemId}`)
  }
  return (
    <Button className="DetailsButton" onClick={handleClick} variant="outlined">
      <InfoOutlinedIcon/><span className="Button-text">Details</span>
    </Button>
  )
}

export default InfoButton;