import styles from './loadingSpinner.module.css'; // Bu CSS modül dosyasını oluşturmayı unutmayın

const LoadingSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
          <div className={styles.loader}></div>
        </div>
      );
};

export default LoadingSpinner;