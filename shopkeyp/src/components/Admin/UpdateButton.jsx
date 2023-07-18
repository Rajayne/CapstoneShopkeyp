import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const UpdateButton = ({itemId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/items/${itemId}/edit`)
  }
  return (
    <Button style={{ fontSize: '.75em' }} className="UpdateButton" variant="contained" onClick={handleClick}>
      Edit
    </Button>
  )
}

export default UpdateButton;