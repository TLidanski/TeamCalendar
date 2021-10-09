import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Team Calendar</title>
        <meta name="description" content="Team Calendar" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
    </div>
  )
}
