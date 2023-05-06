import { customStyles } from './styles'
import { Typography } from '@mui/material'
import styles from '../Products.module.scss'

const Hero = () => {
  return (
    <div>
        <div className={styles.hero}>
      <Typography sx={customStyles.header_featured}  component={'h1'}>Products</Typography>
      </div>
    </div>
  )
}

export default Hero