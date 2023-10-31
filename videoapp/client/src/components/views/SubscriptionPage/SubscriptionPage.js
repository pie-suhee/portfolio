import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";

import "../../../css/layout.css";
import "../../../css/videolist.css";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Videos, setVideos] = useState([]);

  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    axios
      .post("/api/video/getSubscriptionVideos", variable)
      .then((response) => {
        if (response.data.success) {
          setVideos(response.data.videos);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative", marginTop: "1rem" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://3.18.212.70/${video.thumbnail}`}
            />
            <div className="Duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <div className="videoInfo">
          <Meta avatar={<Avatar src={video.thumbnail} />} />
          <div className="videoText">
            <span>{video.title}</span>
            <span>{video.writer.name} </span>
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
          </div>
        </div>
      </Col>
    );
  });

  return (
    <div className="layout HomeLayout">
      <Title level={2}> Subscribed Videos </Title>

      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
