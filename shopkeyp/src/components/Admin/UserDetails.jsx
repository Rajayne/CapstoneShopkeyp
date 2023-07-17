import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UserDetails = ({userId}) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/admin/users/${userId}`)
  }

  return (
    <Button onClick={handleClick} variant="contained">View Profile</Button>
  )
}

export default UserDetails;