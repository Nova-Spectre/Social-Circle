import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import WidgetWrapper from "../../components/WidgetWrapper";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { picturepath } = useSelector((state) => state.user);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 0"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <UserWidget
              userId={userId}
              picturepath={user.picturepath}
              style={{ marginBottom: "20px" }}
            />
            <Box m="2rem 0"/>
            <FriendListWidget userId={userId}/>
            <WidgetWrapper m="2rem 0">
              <AdvertWidget/>
            </WidgetWrapper>
          </Box>
        )}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturepath={picturepath}></MyPostWidget>
          <Box m="2rem 0"/>
          <PostsWidget userId={userId} isProfile/>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
