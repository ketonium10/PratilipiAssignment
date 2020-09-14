import React, { useState } from "react";
import "../CSS/Story.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

function Story({ story }) {
  const [{ user }, dispatch] = useStateValue();

  const history = useHistory();

  const handleOnClick = async e => {
    e.preventDefault();

    //if user exists then do further work else redirect to login

    if (user) {
      //Fetch the current count and total count of this story
      let total, current, storiesViews;
      await db
        .collection("Stories")
        .doc(story?.id)
        .get()
        .then(item => {
          // incTotal(item.total_read);
          // incCurrent(item.cur_read);
          total = item.data().total_read;
          current = item.data().cur_read;
        })
        .catch(error => console.log(error));

      //fetching stories array of user
      await db
        .collection("users")
        .doc(user?.uid)
        .get()
        .then(doc => {
          storiesViews = doc.data().storiesViewed;
        })
        .catch(error => console.log(error.message));

      //Currently viewing the story
      //Do cur = cur + 1, whenever view is clicked
      // incCurrent(current + 1);
      current++;

      //Total counts of story

      //If the user's stories array is zero, then add this story's id to user's stories array
      //and update this array in db and increment total read
      if (storiesViews?.length == 0) {
        storiesViews.push(story.id);
        total++;
        // setStoriesViews([...storiesViews, story.id]);
        // incTotal(total + 1);
      } else {
        //If length is not zero
        //Traverse the ids and check if this story's id is present or not
        //if present then do nothing and continue to next page
        //else add this story's id and increment total_read + 1
        let i = 0;
        for (i = 0; i < storiesViews?.length; i++) {
          if (storiesViews[i] == story.id) {
            break;
          }
        }
        if (i == storiesViews?.length) {
          storiesViews.push(story.id);
          total++;
          // var ele = story.id;
          // setStoriesViews([...storiesViews, "121"]);
          // incTotal(total + 1);
        }
      }

      //Update the users and stories database
      await db
        .collection("users")
        .doc(user?.uid)
        .update({ storiesViewed: storiesViews })
        .catch(error => console.log(error));

      await db
        .collection("Stories")
        .doc(story?.id)
        .update({ total_read: total, cur_read: current })
        .catch(error => console.log(error));

      story.data.total_read = total;
      story.data.cur_read = current;
      dispatch({
        type: "SET_STORY",
        story: story
      });

      history.push("/storyview");
    } else {
      alert("Please Sign In first");
      history.push("/login");
    }
  };

  return (
    <div className="story">
      <div className="story__info">
        <p>{story.data.title}</p>
      </div>
      <img src={story.data.image} alt="" />
      <button onClick={handleOnClick}>View</button>
    </div>
  );
}

export default Story;
