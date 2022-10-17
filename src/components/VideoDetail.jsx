import React from 'react'
import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {Typography, Box, Stack, CardMedia} from '@mui/material'
import {CheckCircle} from '@mui/icons-material'

import Videos from './Videos'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { demoProfilePicture } from '../utils/constants'
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  const [comments, setComments] = useState(null)

  const {id} = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => setVideoDetail(data.items[0]))
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data) => setVideos(data.items))
    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=100`)
    .then((data) => setComments(data.items))
  },[id])
  if(!videoDetail?.snippet || !comments?.length) return 'Loading...'
  const {snippet:{title, channelId, channelTitle, publishedAt}, statistics: {viewCount, likeCount }} = videoDetail;
  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs:'column', md:'row'}}>
        <Box flex ={1}>
          <Box sx ={{width:'100%', position:'sticky', top:'86px'}}>
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
            playing={true}
            />
            <Typography color ="#fff" variant = "h5" fontWeight= "bold">
              {title}
            </Typography>
            <Stack direction ="row" 
            justifyContent="space-between"
            sx={{color:"#fff"}} py={1} px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography color ="#fff" variant = "h6" fontWeight= "bold">
                {channelTitle}
                </Typography>
                </Link>
                <Stack direction={'row'} gap= '20px' alignItems = "center ">
                <Typography variant = "body1" sx={{opacity: 0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant = "body1" sx={{opacity: 0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
                <Typography variant = "body1" sx={{opacity: 0.7}}>
                  {new Date(publishedAt).toLocaleDateString()}
                </Typography>
                </Stack>
            </Stack>
          </Box>
        </Box>
      <Box px={2} py={{md:1, xs:5}} justifyContent='center' alignItems={'center'}>
        <Videos videos={videos} direction = "column"/>
      </Box>
      </Stack>
       {
        comments.map((comment,idx) => (
          <Box marginLeft={1}>
          <Stack flexDirection={'row'} gap={1} marginTop={1}>
          <CardMedia
          image={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || demoProfilePicture}
          alt={comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
          sx={{ borderRadius: '50%', height: '30px', width: '30px', mb: 2, border: '1px solid #e3e3e3' }}
        />
          <Typography variant = "h6" sx={{opacity: 0.7}} color="white" key={idx}>
            {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
          </Typography>
          </Stack>
          <Typography variant = "subtitle1" sx={{opacity: 0.7}} color="white" key={idx}>
            {comment?.snippet?.topLevelComment?.snippet?.textDisplay}
          </Typography>
          </Box>
        ))
       }
    </Box>
  )
}

export default VideoDetail
