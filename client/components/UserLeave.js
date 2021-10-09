import styles from '../styles/UserLeave.module.scss';

const UserLeave = ({event}) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    return (
        <div className={`flex ${styles.container}`}>
            <div className={styles.name}>{event.organizer.params.CN}</div>
            <div className={styles.start}>{`${start.getDate()}/${start.getMonth()+1}/${start.getFullYear()}`}</div>
            <div className={styles.end}>{`${end.getDate()}/${end.getMonth()+1}/${end.getFullYear()}`}</div>
            <div className={styles.summary}>{event.summary}</div>
        </div>
    );
}

export default UserLeave;