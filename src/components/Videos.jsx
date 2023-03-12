import React from 'react'
import {Stack, Box, Typography} from '@mui/material';
import ChannelCard from './ChannelCard';
import VideoCard from './VideoCard';

const Videos = ({videos, direction}) => {
  if(!videos?.length) return (
    <Typography color ="#fff" variant = "h5" fontWeight= "bold" margin={2}>
              Loading your Videos...
    </Typography>
  )
  console.log(videos)
  return (
    <Stack
    direction= {direction || "row"} flexWrap = "wrap" justifyContent = "space-evenly" gap={2}
    >
        {videos.map((item,idx) => (
            <Box key= {idx}>
                {item.id.videoId && <VideoCard video ={item}/>}
                {item.id.channelId && <ChannelCard channelDetail ={item}/>}
            </Box>
        ))}
    </Stack>
  )
}

export default Videos
