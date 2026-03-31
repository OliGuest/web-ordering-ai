import styles from './ServiceBar.module.scss';

const ServiceBar = ({ isOpen, onClose, serviceCallGroups, serviceCallTheme, onServiceRequest, t }) => {
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
           style={{ backgroundColor: serviceCallTheme?.BackgroundColor }}>
        <div className={styles.header}>
          <div className={styles.dragHandle} />
          <h4 style={{ color: serviceCallTheme?.ServiceCallTextColor }}>
            {t('lblService')}
          </h4>
        </div>
        <div className={styles.content}>
          {serviceCallGroups?.map((group, index) => (
            <div className={styles.group} key={index}>
              <h5 className={styles.groupTitle} style={{ color: serviceCallTheme?.GroupTextColor }}>
                {group?.Name}
              </h5>
              <ul className={styles.list}>
                {group?.ServiceCalls?.map((item, i) => (
                  <li key={i}>
                    <button className={styles.serviceItem} onClick={() => onServiceRequest(item)}>
                      <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 10V8.5C1 6.84315 2.34315 5.5 4 5.5H16.5429M12.4286 1L17 5.5L12.4286 10"
                          stroke={serviceCallTheme?.PickUpColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{item?.Message}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ServiceBar;
