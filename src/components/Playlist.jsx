import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { Stack } from "@mui/system";

const Playlist = ({playlist}) => {
  if(!playlist){
    return "Loading..."
  }
    const {id, snippet} = playlist[0]
    return (
      <Card
      sx={{width:{ xs:"100%",sm:'358px', md:'320px' }, boxShadow:'none', borderRadisu:0}}
      >
        <Link to={id ? `/playlist/${id}` : demoVideoUrl}>
          <CardMedia
            alt={snippet?.title}
            sx={{ width: {
              xs:"100%", sm:"358px", md:"320px"
            }, height: 180 }}
            image={snippet?.thumbnails?.high?.url}
          />
        </Link>
        <CardContent sx={{ backgroundColor: "#1e1e1e", height: "160px" }}>
          <Link to={id ? `/playlist/${id}` : demoVideoUrl}>
              <Typography
              variant='subtitle1' fontWeight="bold" color ="#FFF"
              >
                  {snippet?.title.slice(0,60) || demoVideoTitle.slice(0,60)}
              </Typography>
          </Link>
          <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
            <Stack flexDirection={'row'} justifyContent='space-between' marginTop={2}>
              <Typography
              variant='subtitle2' fontWeight="bold" color ="gray"
              >
                  {snippet?.channelTitle.slice(0,60) || demoChannelTitle.slice(0,60)}
                  <CheckCircle
                  sx={{fontSize:12, color:'gray', ml:'5px'}}
                  />
              </Typography>
              <Typography
              variant='subtitle2' fontWeight="bold" color ="gray"
              >
                  {new Date(snippet?.publishedAt).toLocaleDateString()}
              </Typography>
            </Stack>
          </Link>
        </CardContent>
      </Card>
  )
}

export default Playlist