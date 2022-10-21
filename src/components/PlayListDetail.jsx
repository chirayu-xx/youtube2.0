import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {Typography, Box, Stack, CardMedia} from '@mui/material'
import {CheckCircle} from '@mui/icons-material'

import Videos from './Videos'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { demoProfilePicture } from '../utils/constants'
import PlaylistCard from './PlaylistCard'
const PlayListDetail = () =>{
  const [playlistVideos, setPlaylistVideos] = useState([])
  const {playListId} = useParams();
  useEffect(() => {
    fetchFromAPI(`playlistItems?part=snippet&playlistId=${playListId}`)
    .then((data) => setPlaylistVideos(data.items))
  },[playListId])
  if(!playlistVideos.length){
    return(
      <Box minHeight={"95vh"}>
      <Typography color ="#fff" variant = "h5" fontWeight= "bold">
              Loading your Videos...
    </Typography>
      </Box>
      )
  }
  return (
    <Stack
    direction= {"row"} flexWrap = "wrap" justifyContent = "start" gap={2}
    >
        {playlistVideos.map((item,idx) => (
            <Box key= {idx}>
                <PlaylistCard video={item} />
            </Box>
        ))}
    </Stack>
  )
}

export default PlayListDetail
