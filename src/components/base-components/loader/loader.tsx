import { ThreeDots } from 'react-loader-spinner'

import styles from './loader.module.scss'

const Loader = () => (
  <div className={styles.root}>
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4c4cff"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
)

export default Loader
