import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }
  return(
    <>
      <Button onClick={handleBack} id="ItemDetails-back" variant="outlined">Back</Button>
    </>
  )
}

export default BackButton;