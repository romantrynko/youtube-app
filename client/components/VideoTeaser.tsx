import { Card, Text } from '@mantine/core';
import Link from 'next/link'
import React from 'react'
import { Video } from '../types'

export default function VideoTeaser({ video }: {
  video: Video
}) {
  const { videoId, title, description } = video;

  return (
    <Link href={`/watch/${videoId}`} passHref>
      <Card shadow="sm" p="xl" component='a' href={`/watch/${videoId}`}>
        <Text weight={500} size="lg">
          {title}
        </Text>
        <Text>
          {description}
        </Text>
      </Card>
    </Link>
  )
}
