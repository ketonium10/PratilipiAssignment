import React, { useEffect } from "react";
import "../CSS/Storyview.css";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
function Storyview() {
  const [{ user, story }, dispatch] = useStateValue();

  const history = useHistory();

  if (!user || !story || !story.data) {
    history.replace("/");
  }

  const updateCurrent = async e => {
    let current = story?.data?.cur_read;
    current = current - 1;
    await db
      .collection("Stories")
      .doc(story?.id)
      .update({ cur_read: current })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    console.log("mounted");
    console.log(window.performance.navigation.type);
    return () => {
      //When unmounting decrement the current viewers
      console.log(window.performance.navigation.type);
      updateCurrent();
      console.log("unmounting");
    };
  });

  return (
    <div className="storyview">
      <div className="storyview__container">
        <h1 className="storyview__title">{story.data?.title}</h1>
        <p className="storyview__content">{story.data?.Content}</p>
        <h3 className="storyview__read">
          Total read: {story.data?.total_read}
        </h3>
        <h3 className="storyview__current">
          Current read: {story.data?.cur_read}
        </h3>
      </div>
    </div>
  );
}

export default Storyview;
