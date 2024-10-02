/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  LinkedIn,
  Twitter,
  Facebook,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/userImage";
import Flex from "../../components/flex";
import WidgetWrapper from "../../components/widgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileApi, socialLinkAPi } from "../../utils/apiRoutes";
import SocialLinkModal from "../../components/socialLinkModal";
import toast from "react-hot-toast";
import EditProfileModal from "../../components/editProfileModal";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${profileApi}/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const getSocialLinks = async () => {
    const response = await fetch(`${socialLinkAPi}/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setSocialLinks(data);
  };

  const updateSocialLinks = async (updatedLinks) => {
    const response = await fetch(`${socialLinkAPi}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLinks),
    });

    if (response.ok) {
      setSocialLinks(updatedLinks);
      toast.success("Updated Successfully");
    } else {
      console.error("Failed to update social links");
    }
  };

  useEffect(() => {
    getUser();
    getSocialLinks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const updateProfile = async (updatedData) => {
    const response = await fetch(`${profileApi}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setProfileModalOpen(false);
      toast.success("Profile updated successfully");
    } else {
      console.error("Failed to update profile");
    }
  };

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const friendsCount = friends ? friends.length : 0;

  return (
    <WidgetWrapper>
      <Flex
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Flex gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friendsCount} friends</Typography>
          </Box>
        </Flex>
        <ManageAccountsOutlined />
      </Flex>

      <Divider />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>

        <EditOutlined
          sx={{ cursor: "pointer" }}
          onClick={() => setProfileModalOpen(true)}
        />
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Flex mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </Flex>
        <Flex>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </Flex>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <EditOutlined
            sx={{ color: main, cursor: "pointer" }}
            onClick={() => {
              setModalOpen(true); // Open modal for editing links
            }}
          />
        </Box>

        <Flex gap="1rem" mb="0.5rem">
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href={socialLinks?.facebook}
          >
            <Flex gap="1rem">
              <Facebook fontSize="small" sx={{ color: main }} />
              <Box>
                <Typography color={main} fontWeight="500">
                  Facebook
                </Typography>
                <Typography color={medium}>{socialLinks?.facebook}</Typography>
              </Box>
            </Flex>
          </a>
        </Flex>

        <Flex gap="1rem" mb="0.5rem">
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href={socialLinks?.twitter}
          >
            <Flex gap="1rem">
              <Twitter fontSize="small" sx={{ color: main }} />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>{socialLinks?.twitter}</Typography>
              </Box>
            </Flex>
          </a>
        </Flex>

        <Flex gap="1rem">
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href={socialLinks?.linkedIn}
          >
            <Flex gap="1rem">
              <LinkedIn fontSize="small" sx={{ color: main }} />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>{socialLinks?.linkedin}</Typography>
              </Box>
            </Flex>
          </a>
        </Flex>
      </Box>

      <SocialLinkModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        socialLinks={socialLinks}
        onUpdate={updateSocialLinks}
      />

      <EditProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)} // Corrected the onClose prop
        user={user} // Pass the current user data to the modal
        onUpdate={updateProfile} // Ensure this calls updateProfile instead of onClose
      />
    </WidgetWrapper>
  );
};

export default UserWidget;
