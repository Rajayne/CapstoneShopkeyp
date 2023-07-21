import { Button } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom'

const EditUserButton = ({username}) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/admin/users/${username}/edit`)
  }

  return (
    <Button onClick={handleClick} style={{ fontSize: '.75em' }} variant="text">
      <EditOutlinedIcon/>
    </Button>
  )
}

export default EditUserButton;