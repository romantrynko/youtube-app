import { SimpleGrid } from '@mantine/core'
import { ReactElement } from 'react'
import VideoTeaser from '../components/VideoTeaser'
import { useVideo } from '../context/videos'
import HomePageLayout from '../layout/Home'
import styles from '../styles/Home.module.css'

const Home = () => {
  const { videos } = useVideo()

  return (
    <div className={styles.container}>
      <SimpleGrid cols={3}>
        {
          (videos || []).map(video => {
            return <VideoTeaser video={video} key={video.videoId} />
          })
        }
      </SimpleGrid>
    </div>
  )
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>
}

export default Home;
