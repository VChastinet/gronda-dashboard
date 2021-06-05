import styles from './Kpi.module.css'

export const Loading = ({ size = 50 }) => {
  return (
    <div
      data-testid="loading"
      className={styles['lds-dual-ring']}
      style={{ width: size, height: size }}
    >
      <div
        className={styles['lds-dual-ring-after']}
        style={{
          borderWidth: size * 0.1,
          width: size * 0.7 - 6,
          height: size * 0.7 - 6,
        }}
      ></div>
    </div>
  )
}