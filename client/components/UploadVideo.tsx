import { Button, Group, Modal, Progress, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import { useMutation } from "react-query";
import { ArrowBigUpLine } from "tabler-icons-react";
import { uploadVideo } from "../api";

function EditVideoForm({videoId}:{})

export default function UploadVideo() {

  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0)

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = (
        Math.round(progressEvent.loaded * 100) / progressEvent.total
      );

      setProgress(percent)
    }
  }

  function upload(files: File[]) {
    const formData = new FormData()

    formData.append('video', files[0])

    mutation.mutate({ formData, config })
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {(status) => {
              return (
                <Group
                  position="center"
                  spacing="xl"
                  style={{
                    minHeight: "50vh",
                    justifyContent: "center",
                  }}
                  direction="column"
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to find</Text>
                </Group>
              );
            }}
          </Dropzone>
        )}

        {
          progress > 0 && <Progress
            size='xl'
            label={`${progress}%`}
            value={progress}
            mb='xl'
          />
        }

      </Modal>

      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  )
}