import styles from './LanguageBar.module.scss';

const LanguageBar = ({ isOpen, onClose, languages, currentLanguageCode, serviceCallTheme, onSelectLanguage }) => {
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
           style={{ backgroundColor: serviceCallTheme?.BackgroundColor }}>
        <div className={styles.header}>
          <div className={styles.dragHandle} />
          <h4 style={{ color: serviceCallTheme?.ServiceCallTextColor }}>Select Language</h4>
        </div>
        <ul className={styles.list}>
          {languages && languages.length > 0 ? (
            languages.map((lang, index) => (
              <li key={index}>
                <button
                  className={`${styles.langItem} ${currentLanguageCode === lang.Locale ? styles.active : ''}`}
                  onClick={() => onSelectLanguage(index, lang.Locale, lang.Name, lang)}
                >
                  <img src={`${process.env.PUBLIC_URL}/assets/icons/${lang.Locale}.png`} alt={lang.Name} className={styles.flag} />
                  <span>{lang.Name}</span>
                </button>
              </li>
            ))
          ) : (
            <li>
              <span className={styles.langItem}>
                <span>English</span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default LanguageBar;
