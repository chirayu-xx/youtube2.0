import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI} from "../utils/fetchFromAPI";
import Videos from "./Videos";
import Sidebar from "./Sidebar";
import Playlist from "./Playlist";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [videos, setVideos] = useState([]);
  const [playlist, setPlaylist] = useState(null)
  const id = 'RDZiQo7nAkQHU'
  useEffect(() => {
    fetchFromAPI(`playlists?part=snippet&id=RDZiQo7nAkQHU`)
    .then((data) => setPlaylist(data.items))
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data) => setVideos(data.items))
    }, [selectedCategory]);
     console.log(videos)
    return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }} justifyContent="space-between">
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2022 Media
        </Typography>
      </Box>
      <Box padding={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" textAlign={'center'} fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}> videos</span>
        </Typography>
        <Videos videos={videos} />
        {/* <Playlist playlist = {playlist}/> */}
      </Box>
    </Stack>
  );
};

export default Feed;