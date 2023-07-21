import { Button } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom'

const UserDetails = ({username}) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/admin/users/${username}`)
  }

  return (
    <Button onClick={handleClick} style={{ fontSize: '.75em' }} variant="contained">
      <AccountCircleOutlinedIcon/><span className="Button-text">Profile</span>
    </Button>
  )
}

export default UserDetails;