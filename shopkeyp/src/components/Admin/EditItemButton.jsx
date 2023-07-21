import { Button } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

const EditItemButton = ({itemId}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/items/${itemId}/edit`)
  }
  return (
    <Button style={{ fontSize: '.75em' }} className="UpdateButton" variant="text" onClick={handleClick}>
      <EditOutlinedIcon/>
    </Button>
  )
}

export default EditItemButton;