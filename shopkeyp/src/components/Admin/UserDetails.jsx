import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserDetails = ({username}) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/admin/users/${username}`)
  }

  return (
    <Button onClick={handleClick} style={{ fontSize: '.75em' }} variant="contained">View Profile</Button>
  )
}

export default UserDetails;