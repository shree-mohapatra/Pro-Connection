import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { BASE_URl } from "@/config";
import { useRouter } from "next/router";
function DiscoverPage() {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const getOtherUser = async () => {
    if (!authState.all_profiles_fetched) {
      await dispatch(getAllUsers());
      await dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
  };

  useEffect(() => {
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
    if (authState.isTokenThere) {
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
  }, [authState.isTokenThere]);
  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h2>Discover</h2>
          <div className={styles.allUserProfile}>
            {authState.all_profiles_fetched &&
              authState.all_users.map((oneUser) => {
                console.log(authState.user);
                if (authState.user) {
                  if (oneUser.userId._id != authState.user.userId._id) {
                    return (
                      <div
                        onClick={() => {
                          router.push(
                            `/view_profile/${oneUser.userId.username}`
                          );
                        }}
                        key={oneUser._id}
                        className={styles.userCard}
                      >
                        <img
                          className={styles.userCard_image}
                          src={`${BASE_URl}/${oneUser.userId.profilePicture}`}
                          alt="profile"
                        />
                        <div>
                          <h3>{oneUser.userId.name}</h3>
                          <p>@{oneUser.userId.username}</p>
                        </div>
                      </div>
                    );
                  }
                } else {
                  return (
                    <div
                      onClick={() => {
                        router.push(`/view_profile/${oneUser.userId.username}`);
                      }}
                      key={oneUser._id}
                      className={styles.userCard}
                    >
                      <img
                        className={styles.userCard_image}
                        src={`${BASE_URl}/${oneUser.userId.profilePicture}`}
                        alt="profile"
                      />
                      <div>
                        <h3>{oneUser.userId.name}</h3>
                        <p>@{oneUser.userId.email}</p>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export default DiscoverPage;
